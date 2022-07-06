

var InitData;
function getData(url_input, resolve)
{
    let langList=[];

    $.ajax({
    url:url_input
    }).done(
    (data)=>{
        const accountname=url_input.substring(url_input.lastIndexOf('users/')+6,url_input.lastIndexOf('/') );

        const allkeys=Object.keys(data[0]);
     
        // data.forEach((element)=>{ listProject(element);})
    ;
  
        // }
        data.forEach((datapart)=>{
            if(langList.findIndex((element)=> element==datapart.language)==-1){
            langList.push(datapart.language);
        }})
        
        resolve([{'accountName':accountname,
                'accountContent':data},langList]);
    }
    )
   
}

function processListLang(listLang)
{
    console.log(listLang);
    listLang.forEach((lang)=>{
        let optchoice="<option value='"+lang+"'>"+lang+"</option>";
        $("#lang-cons").append(optchoice);
       
    })
    
}


const promise1= new Promise((resolve,reject)=>{
    getData('https://api.github.com/users/hachihao792001/repos',resolve);

} );
const promise2= new Promise((resolve,reject)=>{
    getData('https://api.github.com/users/sangphamitus/repos',resolve);

} );

const getList= async () =>{
      
    var list=[];

    const [respone1,respone2]= await Promise.all([promise1,promise2]);

    return [[... new Set(list.concat(respone1[1],respone2[1]))],
    
           respone1[0],
           respone2[0]];
    
}
$(document).ready(()=>{
setTimeout(()=>{getList().then(([newlist,respone1,respone2])=> {
    processListLang(newlist); 
    InitData= [].concat(respone1,respone2);
    DisplayData('content-1',respone1);
    DisplayData('content-2',respone2);

  

    return newlist;}  );},1000);

});


function getSelectedValue(){
    let name=$("#name-cons")[0].value;
    let lang=$("#lang-cons")[0].value;
    let year=$("#year-cons")[0].value;
    return {'name':name,
            'lang':lang};
}

function DisplayData (tagname,data_input)
{
    const accountname=data_input['accountName']
    const data=data_input['accountContent']

     
    let divname="#"+tagname;

    let optchoice="<option value='"+accountname+"'>"+accountname+"</option>";
    $("#name-cons").append(optchoice);
    let inst="<div class ='py-2'><h1 > account name: <span class='acc-name text-bg-info'>"+ accountname+   "</span></h1></div>" 
    $(inst).insertBefore("#display-"+tagname);
    $(divname).loadTemplate("project.html",data)
    setInterval(()=>{pointingID();},200);
   
   
}
function Filter(data_input,mask)
{ 
    const data=[...new Set(data_input)];
    let list=[];

 

    data.forEach((element)=>{
        let thing= [... new Set(element['accountContent'])];
        thing.forEach((them)=>{
     
                if($('#'+them['id']).hasClass('hidden'))
                {
                 $('#'+them['id']).removeClass('hidden');
                 $('#'+them['id']).addClass('col-md-3');
                }
           
      
        if(mask['name']!='all')
        {
            if(element['accountName']!=mask['name'])
            {
                
                $('#'+them['id']).addClass('hidden');
                $('#'+them['id']).removeClass('col-md-3');
             }
            
        
        }
      
        if(mask['lang']!='all')
        {
            if(them['language'] != mask['lang'])
            {
                
               $('#'+them['id']).addClass('hidden');
               $('#'+them['id']).removeClass('col-md-3');
            }
           

        }   
        

       })
      
    })

}

function getSearch()
{
   
    Filter(InitData, getSelectedValue());
}
function pointingID()
{
    let card=$("[data-field=id]");
    let arr= [...new Set(card )];
    arr.forEach((element)=>
    {
        let par=$(element).closest('.wrapper');
        par[0].setAttribute("id",element.innerText);
    })
}