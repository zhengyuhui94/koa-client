// 下载文件
export default function(fileUrl: string, fileName: string){
    const $a = document.createElement('a');
    // 设置下载的图片名称
    $a.download = fileName;
    // 设置打开的窗口
    $a.target = '_blank';
    $a.href = fileUrl;
    // 创建一个 MouseEvent 事件对象
    const evt: MouseEvent = new MouseEvent('click', {
        view: window,
        bubbles: false, // 阻止事件冒泡
        cancelable: false // 该事件不能被取消
    });
    // 派发事件对象的事件
    $a.dispatchEvent(evt);
}
