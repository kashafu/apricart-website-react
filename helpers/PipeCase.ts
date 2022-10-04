export function fromPipeCase(word: String) : Array<String> {
    return word.replace(/\s/g,'').split('|')
}