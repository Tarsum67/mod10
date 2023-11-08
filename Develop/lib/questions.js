const questions = [
    {
        type:'input',
        message:'Enter logo text (3 character max)',
        name:'text',
        validate: function (input){
            if ('input'.length>3){
                return "text is 3 character limit";
            }return true;
        }
    },
    {
        type:'input',
        message:'Enter desired text or hexdecimal number',
        name:'textColor',
    },
    {
        type:'list',
        message:'select desired shape:',
        choices:['Circle','Triangle','Square'],
        name:'shape',
    },
    {
        type:'input',
        message:'Enter shape color',
        name:'shapeColor',
    },

] 