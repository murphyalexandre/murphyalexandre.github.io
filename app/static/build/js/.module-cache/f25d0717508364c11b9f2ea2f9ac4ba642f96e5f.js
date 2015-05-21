var Thumbnail = React.createClass({displayName: "Thumbnail",
    render: function () {
        return (
            React.createElement("img", {className: "ui large circular image white-border", src: this.props.data.thumbnail})
        );
    }
});

var Header = React.createClass({displayName: "Header",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, this.props.data.name), 
                React.createElement("h2", null, this.props.data.title)
            )
        );
    }
});

var SocialButton = React.createClass({displayName: "SocialButton",
    renderLink: function (link) {
        return link.substr(link.indexOf('//')+2);
    },
    render: function () {
        return (
            React.createElement("p", null, React.createElement("i", {className: this.props.icon}), "  ", React.createElement("a", {href: this.props.link, target: "_blank"}, this.renderLink(this.props.link)))
        );
    }
});

var SocialButtons = React.createClass({displayName: "SocialButtons",
    render: function () {
        var buttonNodes = this.props.social.map(function (button) {
            return (
                button.resume ? React.createElement(SocialButton, {key: button.key, link: button.link, icon: button.icon}) : false
            );
        });

        return (
            React.createElement("div", {className: "socialButtons"}, 
                buttonNodes
            )
        );
    }
});

var ContactInfo = React.createClass({displayName: "ContactInfo",
    render: function () {
        return (
            React.createElement("div", {className: "contact"}, 
                React.createElement("p", null, React.createElement("i", {className: "home icon"}), "  ", this.props.data.home), 
                React.createElement("p", null, React.createElement("i", {className: "envelope icon"}), "  ", React.createElement("a", {href: "mailto:{this.props.data.email}"}, this.props.data.email)), 
                React.createElement("p", null, React.createElement("i", {className: "call icon"}), "  ", React.createElement("a", {href: "tel:{this.props.data.phone}"}, this.props.data.phone)), 
                React.createElement(SocialButtons, {social: this.props.data.social})
            )
        );
    }
});

var Skill = React.createClass({displayName: "Skill",
    renderRating: function (rating) {
        var rendered = [];
        for (var i=0; i<5; i++) {
            rendered.push(React.createElement("span", null, i < rating ? '\u2605' : '\u2606'));
        }

        return rendered;
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("strong", null, this.props.data.name), 
                React.createElement("div", {className: "rating"}, 
                    this.renderRating(this.props.data.rating)
                )
            )
        );
    }
});

var Skills = React.createClass({displayName: "Skills",
    render: function () {
        var skillNodes = this.props.data.map(function (skill) {
            return (
                React.createElement("li", null, 
                    React.createElement(Skill, {key: skill.key, data: skill})
                )
            );
        });

        return (
            React.createElement("table", {className: "vertical-skills"}, 
                React.createElement("tr", null, 
                    React.createElement("td", null, 
                        React.createElement("h4", {className: "vertical"}, this.props.title)
                    ), 
                    React.createElement("td", null, 
                        React.createElement("ul", {className: "skills"}, 
                            skillNodes
                        )
                    )
                )
            )
        );
    }
});

var SkillBox = React.createClass({displayName: "SkillBox",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "skills"}, "Skills"), 
                React.createElement(Skills, {title: "Languages", data: this.props.data.languages}), 
                React.createElement(Skills, {title: "Frameworks", data: this.props.data.frameworks}), 
                React.createElement(Skills, {title: "Various Skills", data: this.props.data.various})
            )
        );
    }
});

var Summary = React.createClass({displayName: "Summary",
    render: function () {
        return (
            React.createElement("div", {className: "summary"}, 
                React.createElement("h3", null, "Summary"), 
                React.createElement("p", null, this.props.data.description.long)
            )
        );
    }
});

var Job = React.createClass({displayName: "Job",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, 
                    React.createElement("h4", null, this.props.data.timeframe)
                ), 
                React.createElement("td", null, 
                    React.createElement("h4", null, this.props.data.title), 
                    React.createElement("h5", null, this.props.data.company), 
                    React.createElement("p", null, 
                        this.props.data.description
                    )
                )
            )
        );
    }
});

var Experience = React.createClass({displayName: "Experience",
    render: function () {
        var experienceNodes = this.props.data.map(function (job) {
            return (
                React.createElement(Job, {key: job.key, data: job})
            );
        });

        return (
            React.createElement("div", {className: "experience"}, 
                React.createElement("h3", null, "Experience"), 
                React.createElement("table", {className: "experience"}, 
                    experienceNodes
                )
            )
        );
    }
});

var School = React.createClass({displayName: "School",
    render: function () {
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, 
                    React.createElement("h4", null, this.props.data.timeframe)
                ), 
                React.createElement("td", null, 
                    React.createElement("h4", null, this.props.data.degree), 
                    React.createElement("h5", null, this.props.data.school), 
                    React.createElement("p", null, this.props.data.specialization)
                )
            )
        );
    }
});

var Education = React.createClass({displayName: "Education",
    render: function () {
        var educationNodes = this.props.data.map(function (school) {
            return (
                React.createElement(School, {key: school.key, data: school})
            );
        });

        return (
            React.createElement("div", null, 
                React.createElement("h3", null, "Education"), 
                React.createElement("table", {className: "experience"}, 
                    educationNodes
                )
            )
        );
    }
});

var Resume = React.createClass({displayName: "Resume",
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
            React.createElement("table", {className: "resume"}, 
                React.createElement("tr", null, 
                    React.createElement("td", {className: "image"}, 
                        React.createElement(Thumbnail, {data: this.state.data})
                    ), 
                    React.createElement("td", {className: "name"}, 
                        React.createElement(Header, {data: this.state.data})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {className: "skills"}, 
                        React.createElement(ContactInfo, {data: this.state.data}), 
                        React.createElement(SkillBox, {data: this.state.data.skills})
                    ), 
                    React.createElement("td", {className: "experience"}, 
                        React.createElement(Summary, {data: this.state.data}), 
                        React.createElement(Experience, {data: this.state.data.experience}), 
                        React.createElement(Education, {data: this.state.data.education})
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(Resume, null),
    document.getElementById('resume')
);
