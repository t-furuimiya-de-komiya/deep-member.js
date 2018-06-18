
module.exports = {
    deepGet, get: deepGet,
    deepSet, set: deepSet,
    joinDeepKeys,
}


function deepGet(root, ...keys) {
    for (let k of iterKeys(keys))
        if (root == null)
            return
        else
            root = root[k]
    return root
}


function deepSet(root, ...args) {
    const val  = args.pop()
    const keys = arrKeys(args)
    const key  = keys.pop()
    for (let k of keys)
        root = root.hasOwnProperty(k) ? root[k] : root[k] = {}
    return root[key] = val
}


function joinDeepKeys(...args)
{
    return arrKeys(args).join('.')
}


function arrKeys(args)
{
    return Array.from(iterKeys(args))
}


function* iterKeys(args)
{
    for (let i of args) {
        if (i == null)
            continue
        if (Array.isArray(i)) {
            yield* iterKeys(i)
            continue
        }
        for (let j of i.toString().split(/\.+/)) {
            const k = j.trim()
            if (k)
                yield k
        }
    }
}
