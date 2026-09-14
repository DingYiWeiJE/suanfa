/**
 题目描述
员工A的磁盘空间经常被耗尽，他需要找到占用空间最大的目录或文件，然后决定如何清理文件释放空间。计算机驱动器和存储设备
给定某一目录，请白那些程序帮他统计目录内一级子目录和文件的占用空间，并返回目标目录一级子项(文件或子目录)中占用空间最大的项。
规则说明：
1. 目录占用空间为其内部所有文件Size的总和，目录本身Size为0
2. 目录深度不高于7，目录或文件名总长度不超过128字节
3. 当存在多个子项占用空间均为最大时，多个子项采用字符升序排列。
4. 目标目录不再文件系统中时(输入路径前缀匹配不到任何路径)，返回空列表。
输入描述
输入要统计的目标目录
文件系统内的文件列表
文件Size列表，该列表中的数据和文件列表存在一一对应关系。
输出描述
目标目录一级子项(文件或子目录)中占用空间最大的项组成的列表。
 */

function handle(targetPath, fileListline, sizesLine) {
    const fileList = fileListline.trim().split(/\s+/);
    const sizeList = sizesLine.trim().split(/\s+/).map(Number);
    const n = fileList.length;
    
    let ans = [];
    let max = -1;
    const tree = {};
    
    function checkPush(name, size) {
        if (size > max) {
            max = size;
            ans = [name];
        } else if (size === max) {
            ans.push(name);
        }
    }
    
    const prefix = targetPath === '/' ? '/' : targetPath + '/';
    
    for (let i = 0; i < n; i++) {
        const curUrl = fileList[i];
        const curSize = sizeList[i];
        
        if (!curUrl.startsWith(prefix)) continue;
        
        const subPath = curUrl.slice(prefix.length).split('/');
        const name = subPath[0];
        const isFile = subPath.length === 1;
        
        if (!tree[name]) {
            tree[name] = { name, size: 0 };
        }
        
        if (isFile) {
            tree[name].size = curSize;
        } else {
            tree[name].size += curSize;
        }
        
        checkPush(name, tree[name].size);
    }
    
    if (ans.length === 0) {
        console.log('');
        return;
    }
    
    ans.sort();
    console.log(ans.join(','));
}

/**
/dir1/dir2-1
/dir0/dir1-1/file1-1 /dir1/dir1-1/file1-1 /dir1/dir2-1/file3-1 /dir1/dir2-1/file3-2 /dir1/dir2-1/file3-3
8192 81920 2048 8192 1024

file3-2


 */