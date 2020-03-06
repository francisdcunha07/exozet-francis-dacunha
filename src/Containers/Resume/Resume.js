import React, {Component} from 'react';
import queryString from 'query-string'
import axiosInstance from '../../axios-request'
import Repository from '../../Component/Repositories/Repository'
import Languages from '../../Component/Languages/Languages'
import './Resume.css'
import UserExist from '../../Component/UserExist/UserExist'
import Spinner from '../../Component/UI/Spinner/Spinner'




class Resume extends Component {
    state = {
        name:'',
        followers:'',
        bio:'',
        year:'',
        userUrl:'',
        userName: '',
        location:'',
        totalRepos:'',
        LanguagesUsed:[],
        repositories:[],
        loader:true,
        userExists:true

        
    }
//mxcl francisdcunha07 defunkt
   async componentDidMount(){
    const params = queryString.parse(this.props.location.search)
    let userName ='';
    let price=0;
    for(let param in params){
        userName = params[param];
      }
      console.log(userName)
    
        axiosInstance.get('/users/'+userName).then( results => {
                 console.log(results.data)
                 const data = results.data;
                 //if(typeof data.message === 'undefined'){
                 axiosInstance.get(data.repos_url).then( repoResults => {
                     console.log(repoResults.data);
                     let projectDetails = [...repoResults.data];
                    // const repoData = [...tempRepo];
                     projectDetails.sort((a,b) => a.stargazers_count - b.stargazers_count).reverse();
                     let temp ={};  let tempRepo= [], totalRepos = projectDetails.length, language_prjt=[];
                     for (var i=0; i<projectDetails.length; i++){
                      //   if(projectDetails[i].stargazers_count > 200 || projectDetails.length < 5 ){
                              temp ={};
                              temp.name = projectDetails[i].name;
                              temp.description = projectDetails[i].description;
                              temp.forks = projectDetails[i].forks;
                              temp.langUsed = projectDetails[i].languages_url;
                              temp.created = projectDetails[i].created_at;
                              temp.updated = projectDetails[i].updated_at;
                              temp.lang = projectDetails[i].language;
                              temp.Url = projectDetails[i].html_url;
                              temp.stars = projectDetails[i].stargazers_count;
                              tempRepo.push(temp);
                              if(i == 6 ){
                                  break;
                              }
                       //  }
                     }
                  //   const repoData = [...tempRepo];
                    // repoData.sort((a,b) => a.stars - b.stars).reverse();
                    
                     
                     this.setState({name: data.name !=null ? data.name : data.login,
                     userName: data.login, userUrl: data.html_url,
                     year:data.created_at, bio: data.bio != null ? data.bio : "A passionate Github user", location :data.location,
                     totalRepos : totalRepos, followers: data.followers,  repositories: tempRepo, loader:true, userExists:true});
                    // this.setState({ })
                    this.loadResume();
                 })
                //  }else{
                //      this.setState({userExists:false})
                //  }
                 
                 
        }).catch(err => { 
            this.setState({userExists:false})
        })
    }

   async loadResume(){
        const { LanguagesUsed, repositories } = this.state;
        let  langData =[]; const langObj = {};
        for(let i =0; i < repositories.length; i ++){
            let langTemp = await axiosInstance.get(repositories[i].langUsed);
            const totalBytes = Object.keys(langTemp.data).reduce((sum,key)=>sum+parseFloat(langTemp.data[key]||0),0);
            let langObject ={}; 
            for (let key in langTemp.data) {
                langObject[key] = ((langTemp.data[key]/ totalBytes)*100);
                if(langObj[key] !== undefined){
                    langObj[key] = (langObj[key] + langObject[key])/2;
                }else{
                    langObj[key] = langObject[key];
                }
              }
              
        }
        langData.push(langObj)
        this.setState({LanguagesUsed: Object.entries(langObj), loader:false})
    }

    render(){
        const { name, bio, userUrl, year, followers, location, totalRepos, repositories, LanguagesUsed, loader, userExists} = this.state;
        let repository_bind =<div>No Repository</div>;
        let language_bind = '';
        let content_bind = <div><Spinner /> </div>;
        if(repositories != ''){
            repository_bind =   repositories.map (repository => {
                return   <Repository repository = {repository} />
            })
            language_bind = <div> Loading... </div>;
            if(LanguagesUsed.length && !loader){
                language_bind = LanguagesUsed.map (lang => {
                    return   <Languages langUsed = {lang} />
                })
            }else if (!loader){
                language_bind ='';

            }
        }

        if(name != ''){
            content_bind = (<div className="resumeContainer">
            <div className="innerContainer">
                <h1>{name}</h1>
                <h2>{bio}</h2>
                <div className="marginBtm"><a href ={userUrl} target="_blank"><span className="salmonColor">{ userUrl}</span></a> </div>
                <div className="marginBtm">On GitHub since {year.split("-")[0]}, {name} is a developer { location != null ? "based in " + location: ""} with <span> {totalRepos} public repositories</span> and <span>{followers} followers.</span></div>
                
                <div className="heading marginBtm" style={ LanguagesUsed.length > 0 ? {display:'block'} : {display:'none'} }> Languages </div>
                <div style={{width:'100%', display: 'inline-block'}} className="marginBtm ">
                   { language_bind }
                </div>
                <div className="heading marginBtm"> Popular Repositories </div>
                   {repository_bind}
            </div>
            </div>  )
        }else if(!userExists){
            content_bind = (<div className="genMainCont"> <UserExist  /></div>);
        }

        
        
        return (
            <div className="mainConatiner">
              {content_bind}
            </div>
        )
    }
}

export default Resume;