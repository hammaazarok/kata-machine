class TrieNode {
  public children: { [key: string]: TrieNode };
  public isWord: Boolean

  constructor() {
    this.children = {}
    this.isWord = false;
  }
}

export default class Trie {
  public root: TrieNode
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, node = this.root) {
    for (const char of word) {
      const child = node.children[char] || new TrieNode();

      node.children[char as keyof Object] = child

      node = child;
    }

    node.isWord = true;
  }

  find(prefix: string, node = this.root) {
    for (const char of prefix) {
      const child = node.children[char] || null;

      if (!child) {
        return [];
      };

      node = child;
    }
    const res = this.findSuggetions(prefix, node)
    console.log(res);
    return res
  }

  delete(word: string, node = this.root) {
    for (const char of word) {
      const child = node.children[char] || null;

      if (!child) {
        return [];
      };

      node = child;
    }
    const hasChildren = Object.keys(node.children).length > 0;
    if (node.isWord) {
      if (hasChildren) {
        node.isWord = false
      } else {
        node = new TrieNode
      }
      return true
    } else {
      return false
    }
  }

  private findSuggetions(prefix: string, node = this.root, result: string[] = []): string[] {
    if (node.isWord) {
      result.push(prefix);
    }
    for (const [char, child] of Object.entries(node.children)) {
      this.findSuggetions(prefix + char, child, result);
    }
    return result
  }
}
