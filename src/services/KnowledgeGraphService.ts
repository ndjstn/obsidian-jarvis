import type { App, TFile, CachedMetadata } from 'obsidian';
import type JarvisPlugin from '../main';

export interface GraphNode {
  path: string;
  title: string;
  links: string[];       // Outgoing links
  backlinks: string[];   // Incoming links
  tags: string[];
  wordCount: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphCluster {
  id: number;
  nodes: string[];
  mainTopic: string;
  size: number;
}

export interface PathResult {
  path: string[];
  length: number;
}

export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  orphanCount: number;
  avgConnections: number;
  mostConnected: { path: string; connections: number }[];
  clusters: number;
}

export class KnowledgeGraphService {
  private plugin: JarvisPlugin;
  private app: App;
  private graph: Map<string, GraphNode> = new Map();
  private isBuilt = false;

  constructor(plugin: JarvisPlugin) {
    this.plugin = plugin;
    this.app = plugin.app;
  }

  /**
   * Build the knowledge graph from vault metadata
   */
  async buildGraph(): Promise<number> {
    this.graph.clear();
    const files = this.app.vault.getMarkdownFiles();

    // First pass: create all nodes
    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const node = this.createNode(file, cache);
      this.graph.set(file.path, node);
    }

    // Second pass: populate backlinks
    for (const [path, node] of this.graph) {
      for (const linkPath of node.links) {
        const targetNode = this.graph.get(linkPath);
        if (targetNode && !targetNode.backlinks.includes(path)) {
          targetNode.backlinks.push(path);
        }
      }
    }

    this.isBuilt = true;
    return this.graph.size;
  }

  private createNode(file: TFile, cache: CachedMetadata | null): GraphNode {
    const links: string[] = [];

    // Extract wiki links
    if (cache?.links) {
      for (const link of cache.links) {
        const linkedFile = this.app.metadataCache.getFirstLinkpathDest(link.link, file.path);
        if (linkedFile) {
          links.push(linkedFile.path);
        }
      }
    }

    // Extract embed links
    if (cache?.embeds) {
      for (const embed of cache.embeds) {
        const linkedFile = this.app.metadataCache.getFirstLinkpathDest(embed.link, file.path);
        if (linkedFile && !links.includes(linkedFile.path)) {
          links.push(linkedFile.path);
        }
      }
    }

    // Extract tags
    const tags: string[] = [];
    if (cache?.tags) {
      for (const tag of cache.tags) {
        tags.push(tag.tag);
      }
    }
    if (cache?.frontmatter?.tags) {
      const fmTags = cache.frontmatter.tags;
      if (Array.isArray(fmTags)) {
        tags.push(...fmTags.map(t => `#${t}`));
      } else if (typeof fmTags === 'string') {
        tags.push(`#${fmTags}`);
      }
    }

    // Word count from sections
    let wordCount = 0;
    if (cache?.sections) {
      wordCount = cache.sections.reduce((acc, s) => acc + (s.position.end.offset - s.position.start.offset), 0) / 5;
    }

    return {
      path: file.path,
      title: file.basename,
      links: [...new Set(links)], // Deduplicate
      backlinks: [],
      tags: [...new Set(tags)],
      wordCount: Math.round(wordCount)
    };
  }

  /**
   * Find shortest path between two notes using BFS
   */
  findPath(startPath: string, endPath: string): PathResult | null {
    if (!this.isBuilt) return null;

    const start = this.resolvePath(startPath);
    const end = this.resolvePath(endPath);

    if (!start || !end) return null;
    if (start === end) return { path: [start], length: 0 };

    // BFS
    const queue: { path: string; chain: string[] }[] = [{ path: start, chain: [start] }];
    const visited = new Set<string>([start]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const node = this.graph.get(current.path);

      if (!node) continue;

      // Check both links and backlinks for bidirectional traversal
      const neighbors = [...node.links, ...node.backlinks];

      for (const neighbor of neighbors) {
        if (neighbor === end) {
          return {
            path: [...current.chain, neighbor],
            length: current.chain.length
          };
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({
            path: neighbor,
            chain: [...current.chain, neighbor]
          });
        }
      }
    }

    return null; // No path found
  }

  /**
   * Find all orphan notes (no links and no backlinks)
   */
  findOrphans(): GraphNode[] {
    if (!this.isBuilt) return [];

    const orphans: GraphNode[] = [];
    for (const [, node] of this.graph) {
      if (node.links.length === 0 && node.backlinks.length === 0) {
        orphans.push(node);
      }
    }

    return orphans;
  }

  /**
   * Find bridge notes - notes that connect otherwise disconnected parts
   * (high betweenness centrality approximation)
   */
  findBridgeNotes(limit = 10): GraphNode[] {
    if (!this.isBuilt) return [];

    // Score each node by: (backlinks * links) / (backlinks + links)
    // This finds notes that both receive and give links
    const scored: { node: GraphNode; score: number }[] = [];

    for (const [, node] of this.graph) {
      const inDegree = node.backlinks.length;
      const outDegree = node.links.length;

      if (inDegree > 0 && outDegree > 0) {
        // Harmonic mean of in and out degrees
        const score = (2 * inDegree * outDegree) / (inDegree + outDegree);
        scored.push({ node, score });
      }
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.node);
  }

  /**
   * Find clusters using simple connected components with tag similarity
   */
  findClusters(): GraphCluster[] {
    if (!this.isBuilt) return [];

    const visited = new Set<string>();
    const clusters: GraphCluster[] = [];
    let clusterId = 0;

    for (const [path] of this.graph) {
      if (visited.has(path)) continue;

      // BFS to find connected component
      const component: string[] = [];
      const queue = [path];

      while (queue.length > 0) {
        const current = queue.shift()!;
        if (visited.has(current)) continue;

        visited.add(current);
        component.push(current);

        const node = this.graph.get(current);
        if (node) {
          for (const neighbor of [...node.links, ...node.backlinks]) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          }
        }
      }

      if (component.length > 1) {
        // Find most common tag as topic
        const tagCounts = new Map<string, number>();
        for (const nodePath of component) {
          const node = this.graph.get(nodePath);
          if (node) {
            for (const tag of node.tags) {
              tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            }
          }
        }

        let mainTopic = 'Untitled Cluster';
        let maxCount = 0;
        for (const [tag, count] of tagCounts) {
          if (count > maxCount) {
            maxCount = count;
            mainTopic = tag;
          }
        }

        clusters.push({
          id: clusterId++,
          nodes: component,
          mainTopic,
          size: component.length
        });
      }
    }

    return clusters.sort((a, b) => b.size - a.size);
  }

  /**
   * Suggest links for a note based on shared tags and content similarity
   */
  async suggestLinks(notePath: string, limit = 5): Promise<{ path: string; reason: string; score: number }[]> {
    if (!this.isBuilt) await this.buildGraph();

    const node = this.graph.get(notePath);
    if (!node) return [];

    const suggestions: { path: string; reason: string; score: number }[] = [];
    const existingLinks = new Set([...node.links, ...node.backlinks, notePath]);

    for (const [candidatePath, candidateNode] of this.graph) {
      if (existingLinks.has(candidatePath)) continue;

      let score = 0;
      const reasons: string[] = [];

      // Tag overlap
      const sharedTags = node.tags.filter(t => candidateNode.tags.includes(t));
      if (sharedTags.length > 0) {
        score += sharedTags.length * 2;
        reasons.push(`shared tags: ${sharedTags.slice(0, 3).join(', ')}`);
      }

      // Folder proximity
      const nodeFolder = node.path.split('/').slice(0, -1).join('/');
      const candidateFolder = candidateNode.path.split('/').slice(0, -1).join('/');
      if (nodeFolder === candidateFolder && nodeFolder !== '') {
        score += 1;
        reasons.push('same folder');
      }

      // Common connections (notes that link to both)
      const commonLinks = node.backlinks.filter(bl =>
        candidateNode.backlinks.includes(bl) || candidateNode.links.includes(bl)
      );
      if (commonLinks.length > 0) {
        score += commonLinks.length * 1.5;
        reasons.push(`${commonLinks.length} common connection(s)`);
      }

      if (score > 0) {
        suggestions.push({
          path: candidatePath,
          reason: reasons.join('; '),
          score
        });
      }
    }

    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Get graph statistics
   */
  getStats(): GraphStats {
    if (!this.isBuilt) {
      return {
        totalNodes: 0,
        totalEdges: 0,
        orphanCount: 0,
        avgConnections: 0,
        mostConnected: [],
        clusters: 0
      };
    }

    let totalEdges = 0;
    let totalConnections = 0;
    const connectionCounts: { path: string; connections: number }[] = [];

    for (const [path, node] of this.graph) {
      const connections = node.links.length + node.backlinks.length;
      totalEdges += node.links.length;
      totalConnections += connections;
      connectionCounts.push({ path, connections });
    }

    const orphans = this.findOrphans();
    const clusters = this.findClusters();

    return {
      totalNodes: this.graph.size,
      totalEdges,
      orphanCount: orphans.length,
      avgConnections: this.graph.size > 0 ? totalConnections / this.graph.size : 0,
      mostConnected: connectionCounts
        .sort((a, b) => b.connections - a.connections)
        .slice(0, 5),
      clusters: clusters.length
    };
  }

  /**
   * Get notes that might need attention (orphans, dead ends, etc.)
   */
  getMaintenanceReport(): {
    orphans: GraphNode[];
    deadEnds: GraphNode[];      // Has backlinks but no outgoing links
    sources: GraphNode[];       // Has outgoing links but no backlinks
    wellConnected: GraphNode[]; // Healthy notes with both
  } {
    if (!this.isBuilt) {
      return { orphans: [], deadEnds: [], sources: [], wellConnected: [] };
    }

    const orphans: GraphNode[] = [];
    const deadEnds: GraphNode[] = [];
    const sources: GraphNode[] = [];
    const wellConnected: GraphNode[] = [];

    for (const [, node] of this.graph) {
      const hasLinks = node.links.length > 0;
      const hasBacklinks = node.backlinks.length > 0;

      if (!hasLinks && !hasBacklinks) {
        orphans.push(node);
      } else if (hasBacklinks && !hasLinks) {
        deadEnds.push(node);
      } else if (hasLinks && !hasBacklinks) {
        sources.push(node);
      } else {
        wellConnected.push(node);
      }
    }

    return { orphans, deadEnds, sources, wellConnected };
  }

  /**
   * Resolve a note name or path to full path
   */
  private resolvePath(input: string): string | null {
    // If already a full path and exists
    if (this.graph.has(input)) {
      return input;
    }

    // Try to find by basename
    const inputLower = input.toLowerCase().replace(/\.md$/, '');
    for (const [path, node] of this.graph) {
      if (node.title.toLowerCase() === inputLower) {
        return path;
      }
    }

    // Try partial match
    for (const [path] of this.graph) {
      if (path.toLowerCase().includes(inputLower)) {
        return path;
      }
    }

    return null;
  }

  /**
   * Get a node by path
   */
  getNode(path: string): GraphNode | undefined {
    const resolved = this.resolvePath(path);
    return resolved ? this.graph.get(resolved) : undefined;
  }

  /**
   * Check if graph is built
   */
  isGraphBuilt(): boolean {
    return this.isBuilt;
  }
}
