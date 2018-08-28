
//判断手机号规则是否正确 成功为 true, 失败为 false
const isPoneAvailable = phone => {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test (phone)) {
    return false;
  } else {
    return true;
  }
};

 
//验证函数
const Validate = (formdata, {rules = {}} = {}) => {
  let err = null;
  if (!formdata) {
    console.log ('请填写验证数据');
    err = {
      msg: '请填写验证数据',
    };
    return Promise.reject (err);
     
  }
  if(Object.keys(rules).length==0){
    console.log ('请填写验证规则');
    err = {
      msg: '请填写验证规则',
    };
    return Promise.reject (err);
 
  }
  for (let key in formdata) {
    for (let rulefiled in rules) {
      //判断是否为空
      if (rules[rulefiled].required == true) {
        if (formdata[rulefiled] == '') {
          err = {
            msg: rules[rulefiled].message,
          };

          return Promise.reject (err);
        }
      }
      //判断是否相等

      /**规则验证手机号码**/
      //判断是否启用 phone 支持
      if (rules[rulefiled].phone && rules[rulefiled].phone == true) {
        if (isPoneAvailable (formdata[rulefiled]) == false) {
          if (Array.isArray (rules[rulefiled].message)) {
            err = {
              msg: rules[rulefiled].message[1],
            };
          } else {
            err = {
              msg: rules[rulefiled].message,
            };
          }

          return Promise.reject (err);
        }
      }
    }
  }
  return Promise.resolve (formdata);
};

//使用例子
let data = {
  name: '3333',
  phone: 13960997165,
};
Validate (data, {
  rules: {
    name: {
      required: true,
      message: '请选择权限组',
    },
    phone: {
      required: true,
      phone: true,
      message: ['请选择权限组', '手机格式不对'],
    },
  },
})
  .then (res => {
    console.log ('values', res);
  })
  .catch (err => {
    console.log ('err', err);
  });
