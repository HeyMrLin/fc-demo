export default {
	install (Vue, options) {
		Vue.prototype.$axiosGet = axiosGet;
    Vue.prototype.$axiosDelete = axiosDelete;
    Vue.prototype.$axiosPost = axiosPost;
    Vue.prototype.$axiosPut = axiosPut;
	}
}

//------------------默认配置项start-------------------------

const URLDEFAULT = '';

const dd = {};

const successFunc = function (d, t) {}

const errorFunc = function (d, t) {
  if(d.info) {
    t.$message({message: d.info, type: 'warning'});
  }else {
    t.$message({message: '网络错误！', type: 'warning'});
  }
}

const catchFunct = function (err, t) {
  console.log(err); 
  t.$message({message: '网络错误！', type: 'error'});
}

const completeFunc = function (d, t) {}
//------------------默认配置项end-------------------------

function axiosGet ({url=URLDEFAULT, data=dd, success=_=>{successFunc(_, this)}, error=_=>{errorFunc(_, this)}, catchFunc=_=>{catchFunct(_, this)}, complete=_=>{completeFunc(_, this)} }) {
  
  
  const res = this.$axios.get(url, { params: data });
  res
    .then(response=>{
      const d = response.data;
      if(d.status == -1) {
        window.location.href = '/login';
        return false;
        // console.log(url);
      }
      d.status > 0 ? success(d) : error(d);
      
      complete(d);

    })
    .catch(err=>{
      catchFunc(err); 
      complete(err);
    });

  return res;
}
function axiosDelete({ url=URLDEFAULT, data=dd, success=_=>{successFunc(_, this)}, error=_=>{errorFunc(_, this)}, catchFunc=_=>{catchFunct(_, this)}, complete=_=>{completeFunc(_, this)} }) {


  const res = this.$axios.delete(url, { params: data });
  res
    .then(response=>{
      const d = response.data;
      d.status > 0 ? success(d) : error(d);

      complete(d);
    })
    .catch(err=>{ 
      catchFunc(err); 
      complete(err); 
    });

  return res;
}

function axiosPost ({ url=URLDEFAULT, data=dd, success=_=>{successFunc(_, this)}, error=_=>{errorFunc(_, this)}, catchFunc=_=>{catchFunct(_, this)}, complete=_=>{completeFunc(_, this)} }) {

  
  const res = this.$axios.post(url, data);
  res
    .then(response=>{
      const d = response.data;
      d.status > 0 ? success(d) : error(d);

      complete(d);
    })
    .catch(error=>{
      catchFunc(error); 
      complete(error);
    });

  return res;
}

function axiosPut ({ url=URLDEFAULT, data=dd, success=_=>{successFunc(_, this)}, error=_=>{errorFunc(_, this)}, catchFunc=_=>{catchFunct(_, this)}, complete=_=>{completeFunc(_, this)} }) {

  
  const res = this.$axios.put(url, data);
  res
    .then(response=>{
      const d = response.data;
      d.status > 0 ? success(d) : error(d);
      
      complete(d);
    })
    .catch((d)=>{
      catchFunc(d); 
      complete(d);
    });

  return res;
}