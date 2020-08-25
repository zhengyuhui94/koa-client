let UPLOAD_PATH: string = '/upload/uploadfile';

if(process.env.NODE_ENV === 'development'){
    UPLOAD_PATH = `http://127.0.0.1:3002${UPLOAD_PATH}`;
}else{
    UPLOAD_PATH = `https://koamall.top/upload${UPLOAD_PATH}`;
}

export default UPLOAD_PATH;