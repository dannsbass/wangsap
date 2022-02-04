const fs = require('fs')
const colors = require('colors')

function nocache(module, cb = () => { }) {
    console.log('Warn'.red, `'${module}'`.yellow, 'waiting for change!')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })

}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { nocache, uncache }