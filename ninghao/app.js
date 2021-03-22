/**
* 模型 - Model
*/

var Note = Backbone.Model.extend({
    defaults:{      //Model实例默认的属性
        title:'',
        created_at:new Date()
    },
    initialize:function(){   //Model实例化时调用initialize函数
        console.log('新建了一条笔记：'+this.get('title'));
        this.on('change',function(model,options){  //change事件，当model实例的属性值发生变化时，触发对应的函数
            console.log('属性发生了变化');
        });
        this.on('change title',function(model,options){  //title属性发生change事件时，触发对应的函数
            console.log('title发生了变化');
        });

        this.on('invalid',function(model,error){   //绑定valid事件函数
            console.log(error);
        });

    },
    //validate函数验证不通过时，触发invalid事件，validate函数返回值作为invalid函数的error参数传入
    validate:function(attributes,options){   //Note实例note执行note.set('title','hi',{'validate':true})时，会调用validate方法验证
        if(attributes.title.length<3){
            return 'title长度必须大于3';
        }
    }
});

/**
 * 视图 - View
 * el属性，是DOM元素，视图通过它组织内容，默认是div标签
 * 视图里的render方法可以model的change事件绑定，这样model属性变化后，可以马上反映到视图上
 */
var NoteView = Backbone.View.extend({
    tagName:'li',
    className:'item',  //设置标签的class
    //设置li标签的属性,属性名带有“-”，所以要用引号
    attributes:{
        'data-role':'list'
    },

    render:function(){
        this.$el.html(this.model.get('title'));
    }
});

var note = new Note({    //实例化model
    title:'西红柿炒鸡蛋的做法'
});

var noteView = new NoteView({    //实例化视图，设置这个视图实例关联的模型实例
    model:note
});
//在控制台执行以下命令查看,比对执行render前后，noteView的标签内容的差异
//noteView.el
//noteView.render()
//noteView.el
