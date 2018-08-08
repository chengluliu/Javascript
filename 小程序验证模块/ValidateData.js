/**
 *   {form.getFieldDecorator ('project_id', {
                rules: [{required: true, message: '请选择权限组'}],
                initialValue: getProject (projects),
              }) (

   this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
 */
const isPoneAvailable = phone => {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test (phone)) {
    return false;
  } else {
    return true;
  }
};

const Validate = (formdata, {rules = {}} = {}) => {
  let err = null;
  if (!formdata) {
    console.log ('请填写验证数据');
    err = {
      msg: '请填写验证数据',
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

      //规则验证手机号码
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

//test code
// let tmp = "cc"
// console.log(isEmpty(tmp))
//const defaultValidate = (formdata,{rules={},}={})=>{
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
