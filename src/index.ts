import {serverHttp, PORT} from './app' 

serverHttp.listen(PORT, () => console.log(`:rocket Running at http://localhost:${PORT}`));
