type LinkMap = Map<[number, number], string>

/** 
 * Grabs a string with anchor tags...  
 * 
 * "foo <a href="bar">baz</a> qux"
 * 
 * and returns...
 * 
 * "foo baz qux", Map [[4, 6] => bar] 
 * 
 * The map says baz should be a link that starts at index 4 and ends at index 6
 * and the href should be bar (like bar.com)
 */
export function extractLinks(str: string): [string, LinkMap] {
  const linkMap = new Map() as LinkMap
  const newStr: string[] = []

  for (let i = 0; i < str.length; i++) {

    // if we run into a link...
    if (str[i] === "<" && str[i + 1] === "a") {
      const startIndex = newStr.length

      // go to the href (only two attributes have an h in them, href and hreflang)
      while (str[i] !== "h" && str[i + 5] !== "l") i++

      // go to the href value
      i = i + 6

      // grab the href value 
      const href = []
      while (str[i] !== "\"") {
        href.push(str[i])
        i++
      }

      // go to the anchor tag content
      while (str[i] !== ">") i++
      i++

      const startOfContentIndex = i

      // add the anchor tag content to the newStr
      while (str[i] !== "<") {
        newStr.push(str[i])
        i++
      }

      const endOfContentIndex = i - 1
      const contentLength = endOfContentIndex - startOfContentIndex

      i = i + 4

      linkMap.set([startIndex, startIndex + contentLength], href.join(''))
    }

    newStr.push(str[i])
  }

  return [newStr.join(''), linkMap]
}
