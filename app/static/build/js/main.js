var Card = React.createClass({displayName: "Card",
    handleMessage: function () {
        location.href = "#contact";
    },
    componentDidMount: function () {
        $('.ui.button.write').on('click', this.handleMessage);
    },
    render: function () {
        return (
            React.createElement("div", {id: "title", className: "slide header"}, 
                React.createElement("div", {className: "ui grid"}, 
                    React.createElement("div", {className: "column"}, 
                        React.createElement("div", {className: "ui card segment centered", style: {margin: '0 auto'}}, 
                            React.createElement("div", {className: "image"}, 
                                React.createElement("img", {src: this.props.data.thumbnail})
                            ), 
                            React.createElement("div", {className: "content"}, 
                                React.createElement("h1", {className: "ui header"}, this.props.data.name), 
                                React.createElement("div", {className: "meta"}, 
                                    React.createElement("h2", {className: "ui header"}, this.props.data.title)
                                ), 
                                React.createElement("div", {className: "description"}, 
                                    this.props.data.description.short
                                )
                            ), 
                            React.createElement("div", {className: "extra content"}, 
                                React.createElement("span", {className: "left floated"}, 
                                    React.createElement("a", {href: "/resume", target: "_blank"}, 
                                        React.createElement("i", {className: "folder open outline icon"}), 
                                            "See"
                                    )
                                ), 
                                React.createElement("span", {className: "right floated"}, 
                                    React.createElement("a", {href: "/static/files/murphyalexandre_resume_en.pdf", target: "_blank"}, 
                                        React.createElement("i", {className: "disk outline icon"}), 
                                            "Download"
                                    )
                                )
                            ), 
                            React.createElement("div", {className: "ui bottom attached button write"}, 
                                "Write me"
                            )
                        )
                    )
                )
            )
        );
    }
});

var TemplateOne = React.createClass({displayName: "TemplateOne",
    render: function () {
        var className = 'slide template1 ' + this.props.even;

        return (
            React.createElement("div", {className: className, style: {backgroundImage: 'url("' + this.props.data.background + '")'}}, 
                React.createElement("div", {className: "title"}, 
                    React.createElement("h2", {className: "ui header"}, this.props.data.name), 
                    React.createElement("p", null, 
                        this.props.data.description
                    ), 
                    React.createElement("p", null, React.createElement("strong", null, this.props.data.technologies)), 
                    this.props.data.link ? React.createElement("p", null, React.createElement("a", {href: this.props.data.link, target: "_blank", className: "ui button"}, "Go to site")) : false
                )
            )
        );
    }
});

var TemplateTwo = React.createClass({displayName: "TemplateTwo",
    render: function () {
        var imagesNodes;
        if (this.props.data.images) {
            imagesNodes = this.props.data.images.map(function (image) {
                return (
                    React.createElement("img", {key: image.key, className: image.className, src: image.link})
                );
            });
        }

        var className = 'slide template2 ' + this.props.even;

        return (
            React.createElement("div", {className: className, style: {backgroundImage: 'url("' + this.props.data.background + '")'}}, 
                React.createElement("div", {className: "title"}, 
                    React.createElement("h2", {className: "ui header"}, this.props.data.name), 
                    React.createElement("p", null, 
                        this.props.data.description
                    ), 
                    React.createElement("p", null, React.createElement("strong", null, this.props.data.technologies)), 
                    this.props.data.link ? React.createElement("p", null, React.createElement("a", {href: this.props.data.link, target: "_blank", className: "ui button"}, "Go to site")) : false
                ), 
                imagesNodes
            )
        );
    }
});

var TemplateThree = React.createClass({displayName: "TemplateThree",
    render: function () {
        var className = 'slide template3 ' + this.props.even;

        return (
            React.createElement("div", {className: className, style: {backgroundImage: 'url("' + this.props.data.background + '")'}}, 
                React.createElement("div", {className: "title"}, 
                    React.createElement("h2", {className: "ui header"}, this.props.data.name), 
                    React.createElement("p", null, 
                        this.props.data.description
                    ), 
                    React.createElement("p", null, React.createElement("strong", null, this.props.data.technologies)), 
                    this.props.data.link ? React.createElement("p", null, React.createElement("a", {href: this.props.data.link, target: "_blank", className: "ui button"}, "Go to site")) : false
                )
            )
        );
    }
});

var Projects = React.createClass({displayName: "Projects",
    render: function () {
        var index = 0;
        var projectNodes = this.props.data.projects.map(function (project) {
            var Template = window[project.template];
            var even = index % 2 === 0 ? 'template-even' : 'template-odd';
            index++;

            return (
                React.createElement(Template, {
                    key: project.key, 
                    data: project, 
                    even: even}
                )
            );
        });

        return (
            React.createElement("div", {className: "projects"}, 
                projectNodes
            )
        );
    }
});

var SocialButton = React.createClass({displayName: "SocialButton",
    renderLargeCircular: function (icon) {
        return icon + ' large circular';
    },
    render: function () {
        return (
            React.createElement("a", {href: this.props.link, target: "_blank"}, React.createElement("i", {className: this.renderLargeCircular(this.props.icon)}))
        );
    }
});

var SocialButtons = React.createClass({displayName: "SocialButtons",
    render: function () {
        var buttonNodes = this.props.social.map(function (button) {
            return (
                React.createElement(SocialButton, {key: button.key, link: button.link, icon: button.icon})
            );
        });

        return (
            React.createElement("div", {className: "socialButtons"}, 
                buttonNodes
            )
        );
    }
});

var Contact = React.createClass({displayName: "Contact",
    componentDidMount: function() {
        $('.ui.form').form({
            email: {
                identifier : 'email',
                rules: [
                    {
                        type   : 'length[1]',
                        prompt : 'Please enter an email'
                    },
                    {
                        type   : 'email',
                        prompt : 'Please enter a valid e-mail'
                    }
                ]
            },
            name: {
                identifier : 'name',
                optional   : true
            },
            message: {
                identifier : 'message',
                rules: [
                    {
                        type   : 'length[1]',
                        prompt : 'Please enter a message'
                    }
                ]
            },
        }, {
            inline: true,
            on: 'blur',
            onSuccess: this.handleSubmit
        });
    },
    getInitialState: function () {
        return {
            name: null,
            email: null,
            message: null,
            submitted: null
        };
    },
    handleDismiss: function () {
        $('.message .close').on('click', function() {
            $(this).closest('.message').fadeOut();
        });

        this.setState({submitted: false});
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: 'api/send',
            data: this.state,
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                this.setState({
                    submitted: true,
                    name: null,
                    email: null,
                    message: null
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var submitted;
        if (this.state.submitted !== null) {
            submitted = React.createElement("div", {className: "ui message green"}, 
            React.createElement("i", {className: "close icon", onClick: this.handleDismiss}), 
            React.createElement("div", {className: "header"}, 
                "Message sent, thank you!"
            )
        )
        }
        return (
            React.createElement("div", {id: "contact", className: "slide header"}, 
                React.createElement("div", {className: "ui grid"}, 
                    React.createElement("div", {className: "two column row"}, 
                      React.createElement("div", {className: "column"}, 
                            React.createElement("h1", {className: "ui header"}, "Send me a message"), 
                            React.createElement("p", null, 
                                "Send me a message using the contact form or by sending an email to ", React.createElement("strong", null, "murphyalexandre at gmail dot com"), " wheter it is for new opportunities, comments or even simply a discussion!"
                            ), 
                            React.createElement("p", null, 
                                "You can also reach me on these social networks:"
                            ), 
                            React.createElement("p", null, 
                                React.createElement(SocialButtons, {social: this.props.data.social})
                            )
                      ), 
                      React.createElement("div", {className: "column"}, 
                            React.createElement("form", {className: "ui form segment"}, 
                                submitted, 
                                React.createElement("div", {className: "required field"}, 
                                    React.createElement("label", {htmlFor: "name"}, "Name"), 
                                    React.createElement("input", {type: "text", name: "name", placeholder: "John Doe", value: this.state.name, onChange: this.handleChange('name')})
                                ), 
                                React.createElement("div", {className: "required field"}, 
                                    React.createElement("label", {htmlFor: "email"}, "Email"), 
                                    React.createElement("input", {type: "email", name: "email", placeholder: "john@doe.com", value: this.state.email, onChange: this.handleChange('email')})
                                ), 
                                React.createElement("div", {className: "required field"}, 
                                    React.createElement("label", {htmlFor: "message"}, "Message"), 
                                    React.createElement("textarea", {name: "message", value: this.state.message, onChange: this.handleChange('message')})
                                ), 
                                React.createElement("button", {type: "button", className: "ui submit button"}, "Send"), 
                                React.createElement("div", {className: "ui error message"})
                            )
                      )
                    )
                  )
            )
        );
    }
});

var Portfolio = React.createClass({displayName: "Portfolio",
    getInitialState: function() {
        return {data: {
            "description": {},
            "projects": [],
            "social": []
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
            React.createElement("div", null, 
                React.createElement(Card, {data: this.state.data}), 
                React.createElement(Projects, {data: this.state.data}), 
                React.createElement(Contact, {data: this.state.data})
            )
        );
    }
});

React.render(
    React.createElement(Portfolio, null),
    document.getElementById('portfolio')
);
