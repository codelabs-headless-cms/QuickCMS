import React from 'react';
import '../app.css';
import './homepage.css';





class Homepage extends React.Component{
    state= {
        projects: [],
        search_results: [],
        search_value: "",
    }

    getProjects=() => {
        fetch('/projects')
        .then(response => response.json())
        .then((projects)=> {
            this.setState({projects: projects})

        });
    }
    componentDidMount(){
        this.getProjects()
    }

 
    handleChange=(e)=>{
        let current_list =[];
        let new_list =[]; 
        this.setState({
            search_value: e.target.value
        });     
    }

    onEntered=(e)=>{
        if (e.key === 'Enter') {
           console.log('do validate');
        this.project_search(this.state.search_value)
        }
    }

    project_search=(query)=>{
        fetch(`/projects?search=${query}`)
        .then(response => response.json())
        .then((projects)=>{
            console.log(projects)
            this.setState({projects: projects})

        });
    }

    render () {
        console.log(this.state.search_value)
        return(
            
                <div className="homepage_container">
                    
                        <div class="header">
                            <div><h4 className="homepage_app_name">Quick CMS</h4></div>
                            <div>
                                <a className="left" href="#">Help</a>
                                <a className="left" href="#">Your account</a>
                            </div>
                            </div>

                            <div class="projects">
                            <div><h5 className="heading">Your Projects</h5>  </div>                        
                            <div><a href="/new" className="btn">New Project</a></div>
                              </div>
                            
                              <div className="search_bar">
                              <input type="text" value={this.state.search_value} onKeyDown={this.onEntered} id="search" className="input" onChange={this.handleChange} placeholder="Search for projects "/>
                              </div>
                                                     
                                
                                
                                
                                <div class="projects_list">
                                {this.state.projects.map(project => <div class="project_name"> <div className="block"> </div> <div className="project_title">Project Name: {project.title}</div></div>)}  
                                </div>       
                    

                           
                        </div>

        );
    }
}

export default Homepage;