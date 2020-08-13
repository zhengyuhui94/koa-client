let UPLOAD_PATH: string = '/uploadfile';

if(process.env.NODE_ENV === 'development'){
    UPLOAD_PATH = `/upload${UPLOAD_PATH}`;
}else{
    UPLOAD_PATH = `http://81.70.15.16:3002${UPLOAD_PATH}`;
}

export default UPLOAD_PATH;