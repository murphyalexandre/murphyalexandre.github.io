var Thumbnail = React.createClass({
    render: function () {
        return (
            <img className="ui large circular image white-border" src={this.props.data.thumbnail} />
        );
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{this.props.data.name}</h1>
                <h2>{this.props.data.title}</h2>
            </div>
        );
    }
});

var SocialButton = React.createClass({
    renderLink: function (link) {
        return link.substr(link.indexOf('//')+2);
    },
    render: function () {
        return (
            <p><i className={this.props.icon}></i>&nbsp;&nbsp;<a href={this.props.link} target="_blank">{this.renderLink(this.props.link)}</a></p>
        );
    }
});

var SocialButtons = React.createClass({
    render: function () {
        var buttonNodes = this.props.social.map(function (button) {
            return (
                button.resume ? <SocialButton key={button.key} link={button.link} icon={button.icon}></SocialButton> : false
            );
        });

        return (
            <div className="socialButtons">
                {buttonNodes}
            </div>
        );
    }
});

var ContactInfo = React.createClass({
    render: function () {
        return (
            <div className="contact">
                <p><i className="home icon"></i>&nbsp;&nbsp;{this.props.data.home}</p>
                <p><i className="envelope icon"></i>&nbsp;&nbsp;<a href="mailto:{this.props.data.email}">{this.props.data.email}</a></p>
                <p><i className="call icon"></i>&nbsp;&nbsp;<a href="tel:{this.props.data.phone}">{this.props.data.phone}</a></p>
                <SocialButtons social={this.props.data.social} />
            </div>
        );
    }
});

var Skill = React.createClass({
    renderRating: function (rating) {
        var rendered = [];
        for (var i=0; i<5; i++) {
            rendered.push(<span>{i < rating ? '\u2605' : '\u2606'}</span>);
        }

        return rendered;
    },
    render: function () {
        return (
            <div>
                <strong>{this.props.data.name}</strong>
                <div className="rating">
                    {this.renderRating(this.props.data.rating)}
                </div>
            </div>
        );
    }
});

var Skills = React.createClass({
    render: function () {
        var skillNodes = this.props.data.map(function (skill) {
            return (
                <li>
                    <Skill key={skill.key} data={skill} />
                </li>
            );
        });

        return (
            <table className="vertical-skills">
                <tr>
                    <td>
                        <h4 className="vertical">{this.props.title}</h4>
                    </td>
                    <td>
                        <ul className="skills">
                            {skillNodes}
                        </ul>
                    </td>
                </tr>
            </table>
        );
    }
});

var SkillBox = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="skills">Skills</h3>
                <Skills title="Languages" data={this.props.data.languages} />
                <Skills title="Frameworks" data={this.props.data.frameworks} />
                <Skills title="Various Skills" data={this.props.data.various} />
            </div>
        );
    }
});

var Summary = React.createClass({
    render: function () {
        return (
            <div className="summary">
                <h3>Summary</h3>
                <p>{this.props.data.description.long}</p>
            </div>
        );
    }
});

var Job = React.createClass({
    render: function () {
        return (
            <tr>
                <td>
                    <h4>{this.props.data.timeframe}</h4>
                </td>
                <td>
                    <h4>{this.props.data.title}</h4>
                    <h5>{this.props.data.company}</h5>
                    <p>
                        {this.props.data.description}
                    </p>
                </td>
            </tr>
        );
    }
});

var Experience = React.createClass({
    render: function () {
        var experienceNodes = this.props.data.map(function (job) {
            return (
                <Job key={job.key} data={job} />
            );
        });

        return (
            <div className="experience">
                <h3>Experience</h3>
                <table className="experience">
                    {experienceNodes}
                </table>
            </div>
        );
    }
});

var School = React.createClass({
    render: function () {
        return (
            <tr>
                <td>
                    <h4>{this.props.data.timeframe}</h4>
                </td>
                <td>
                    <h4>{this.props.data.degree}</h4>
                    <h5>{this.props.data.school}</h5>
                    <p>{this.props.data.specialization}</p>
                </td>
            </tr>
        );
    }
});

var Education = React.createClass({
    render: function () {
        var educationNodes = this.props.data.map(function (school) {
            return (
                <School key={school.key} data={school} />
            );
        });

        return (
            <div>
                <h3>Education</h3>
                <table className="experience">
                    {educationNodes}
                </table>
            </div>
        );
    }
});

var Resume = React.createClass({
    getInitialState: function() {
        return {data: {
            "description": [],
            "experience": [],
            "education" : [],
            "social": [],
            "skills": {
                "languages": [],
                "frameworks": [],
                "various": []
            }
        }};
    },
    componentDidMount: function() {
        $.ajax({
            url: 'api/data',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
  },
    render: function () {
        return (
            <table className="resume">
                <tr>
                    <td className="image">
                        <Thumbnail data={this.state.data} />
                    </td>
                    <td className="name">
                        <Header data={this.state.data} />
                    </td>
                </tr>
                <tr>
                    <td className="skills">
                        <ContactInfo data={this.state.data} />
                        <SkillBox data={this.state.data.skills} />
                    </td>
                    <td className="experience">
                        <Summary data={this.state.data} />
                        <Experience data={this.state.data.experience} />
                        <Education data={this.state.data.education} />
                    </td>
                </tr>
            </table>
        );
    }
});

React.render(
    <Resume />,
    document.getElementById('resume')
);
