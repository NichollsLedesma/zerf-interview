
const FOLDER_DELIMITER = '/'
const FOLDER_BACK = '..';

const fs = {
    path: {},
    currentPath: FOLDER_DELIMITER,
    getCurrentDirs: function () {
        const dirs = this.currentPath.split(FOLDER_DELIMITER)
        return dirs.filter(dir => dir)
    },
    getCurrentFolder: function () {
        const dirs = this.getCurrentDirs()
        let aux = this.path
        dirs.forEach(dir => {
            aux = aux[dir]
        })
        return aux
    },
    mkdir: function (newFolderName) {
        const currentFolder = this.getCurrentFolder()
        currentFolder[newFolderName] = { files: [] }
    },
    cd: function (folder) {
        if (folder === FOLDER_BACK) {
            if (this.currentPath === FOLDER_DELIMITER) return;
            const dirs = this.getCurrentDirs()
            dirs.pop()
            this.currentPath = (dirs.length === 0) ? FOLDER_DELIMITER : dirs.join(FOLDER_DELIMITER)
            return;
        }
        const pathSlash = (this.currentPath === FOLDER_DELIMITER) ? '' : FOLDER_DELIMITER
        this.currentPath += `${pathSlash}${folder}`
    },
    pwd: function () {
        console.log(this.currentPath)
    },
    touch: function (fileName) {
        const currentFolder = this.getCurrentFolder();
        currentFolder.files = [...currentFolder.files, fileName];
    },
    ls: function () {
        const currentFolder = this.getCurrentFolder();
        const [files, ...rest] = Object.keys(currentFolder)
        console.log([...rest, ...currentFolder.files].join(' '))
    },
}


fs.mkdir('home')
fs.cd('home')
fs.mkdir('nicholls')
fs.cd('nicholls')
fs.mkdir('unDirectorio')
fs.cd('unDirectorio')
fs.cd('..')
fs.touch('hola.txt')
fs.ls()
fs.pwd()

