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

    //underscore的template函数使用范例：
    //var compiled = _.template("hello: <%= name %>");
    //var html = compiled({name: 'moe'}); // hello: moe
    //template属性关联underscore的template函数返回的结果（预编译函数）；通过jQuery获取页面上模板标签的内容，作为参数传入underscore的template函数里；
    template:_.template(jQuery('#list-template').html()),

    render:function(){
        //this.$el.html(this.model.get('title'));
        //渲染模板上的内容。view的template属性是一个预编译函数，向该函数传入model的属性。
        this.$el.html(this.template(this.model.attributes));
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

/**
 * 集合 - Collection
 */

var NoteCollection = Backbone.Collection.extend({
    model:Note,

    initialize:function(){
        this.on({
            'add':function(model,collection,options){
                console.log('ID:'+model.id+'模型添加到了集合里');
            },
            'remove':function(model,collection,option){
                console.log('ID:'+model.id+'模型从集合里删除了');
            },
            'change':function(model,option){
                console.log('集合里的模型发生了变化');
            }
        })
    }
});

var note1 = new Note({id:1,title:'麻婆豆腐的做法'});
var note2 = new Note({id:2,title:'周六参加朋友的婚礼'});
var note3 = new Note({id:3,title:'晚上回家洗尿布'});

//对集合的操作：添加、删除、重置、更新、排序集合里的模型的时候，都会触发相应的事件。
//add、remove、reset、set、pop、shift、push、unshift、at:index


