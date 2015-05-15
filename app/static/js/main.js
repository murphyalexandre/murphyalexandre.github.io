var Card = React.createClass({
    handleMessage: function () {
        location.href = "#contact";
    },
    componentDidMount: function () {
        $('.ui.button.write').on('click', this.handleMessage);
    },
    render: function () {
        return (
            <div id="title" className="slide header">
                <div className="ui grid">
                    <div className="column">
                        <div className="ui card segment centered" style={{margin: '0 auto'}}>
                            <div className="image">
                                <img src={this.props.data.thumbnail} />
                            </div>
                            <div className="content">
                                <h1 className="ui header">{this.props.data.name}</h1>
                                <div className="meta">
                                    <h2 className="ui header">{this.props.data.title}</h2>
                                </div>
                                <div className="description">
                                    {this.props.data.description.short}
                                </div>
                            </div>
                            <div className="extra content">
                                <span className="left floated">
                                    <a href="/resume" target="_blank">
                                        <i className="folder open outline icon"></i>
                                            See
                                    </a>
                                </span>
                                <span className="right floated">
                                    <a href="/static/files/murphyalexandre_resume_en.pdf" target="_blank">
                                        <i className="disk outline icon"></i>
                                            Download
                                    </a>
                                </span>
                            </div>
                            <div className="ui bottom attached button write">
                                Write me
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var TemplateOne = React.createClass({
    render: function () {
        var className = 'slide template1 ' + this.props.even;

        return (
            <div className={className} style={{backgroundImage: 'url("' + this.props.data.background + '")'}}>
                <div className="title">
                    <h2 className="ui header">{this.props.data.name}</h2>
                    <p>
                        {this.props.data.description}
                    </p>
                    <p><strong>{this.props.data.technologies}</strong></p>
                    {this.props.data.link ? <p><a href={this.props.data.link} target="_blank" className="ui button">Go to site</a></p> : false}
                </div>
            </div>
        );
    }
});

var TemplateTwo = React.createClass({
    render: function () {
        var imagesNodes;
        if (this.props.data.images) {
            imagesNodes = this.props.data.images.map(function (image) {
                return (
                    <img key={image.key} className={image.className} src={image.link} />
                );
            });
        }

        var className = 'slide template2 ' + this.props.even;

        return (
            <div className={className} style={{backgroundImage: 'url("' + this.props.data.background + '")'}}>
                <div className="title">
                    <h2 className="ui header">{this.props.data.name}</h2>
                    <p>
                        {this.props.data.description}
                    </p>
                    <p><strong>{this.props.data.technologies}</strong></p>
                    {this.props.data.link ? <p><a href={this.props.data.link} target="_blank" className="ui button">Go to site</a></p> : false}
                </div>
                {imagesNodes}
            </div>
        );
    }
});

var TemplateThree = React.createClass({
    render: function () {
        var className = 'slide template3 ' + this.props.even;

        return (
            <div className={className} style={{backgroundImage: 'url("' + this.props.data.background + '")'}}>
                <div className="title">
                    <h2 className="ui header">{this.props.data.name}</h2>
                    <p>
                        {this.props.data.description}
                    </p>
                    <p><strong>{this.props.data.technologies}</strong></p>
                    {this.props.data.link ? <p><a href={this.props.data.link} target="_blank" className="ui button">Go to site</a></p> : false}
                </div>
            </div>
        );
    }
});

var Projects = React.createClass({
    render: function () {
        var index = 0;
        var projectNodes = this.props.data.projects.map(function (project) {
            var Template = window[project.template];
            var even = index % 2 === 0 ? 'template-even' : 'template-odd';
            index++;

            return (
                <Template
                    key={project.key}
                    data={project}
                    even={even}>
                </Template>
            );
        });

        return (
            <div className="projects">
                {projectNodes}
            </div>
        );
    }
});

var SocialButton = React.createClass({
    renderLargeCircular: function (icon) {
        return icon + ' large circular';
    },
    render: function () {
        return (
            <a href={this.props.link} target="_blank"><i className={this.renderLargeCircular(this.props.icon)}></i></a>
        );
    }
});

var SocialButtons = React.createClass({
    render: function () {
        var buttonNodes = this.props.social.map(function (button) {
            return (
                <SocialButton key={button.key} link={button.link} icon={button.icon}></SocialButton>
            );
        });

        return (
            <div className="socialButtons">
                {buttonNodes}
            </div>
        );
    }
});

var Contact = React.createClass({
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
            submitted = <div className="ui message green">
            <i className="close icon" onClick={this.handleDismiss}></i>
            <div className="header">
                Message sent, thank you!
            </div>
        </div>
        }
        return (
            <div id="contact" className="slide header">
                <div className="ui grid">
                    <div className="two column row">
                      <div className="column">
                            <h1 className="ui header">Send me a message</h1>
                            <p>
                                Send me a message using the contact form or by sending an email to <strong>murphyalexandre at gmail dot com</strong> wheter it is for new opportunities, comments or even simply a discussion!
                            </p>
                            <p>
                                You can also reach me on these social networks:
                            </p>
                            <p>
                                <SocialButtons social={this.props.data.social} />
                            </p>
                      </div>
                      <div className="column">
                            <form className="ui form segment">
                                {submitted}
                                <div className="required field">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" placeholder="John Doe" value={this.state.name} onChange={this.handleChange('name')} />
                                </div>
                                <div className="required field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" placeholder="john@doe.com" value={this.state.email} onChange={this.handleChange('email')} />
                                </div>
                                <div className="required field">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" value={this.state.message} onChange={this.handleChange('message')} />
                                </div>
                                <button type="button" className="ui submit button">Send</button>
                                <div className="ui error message"></div>
                            </form>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
});

var Portfolio = React.createClass({
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
            <div>
                <Card data={this.state.data} />
                <Projects data={this.state.data} />
                <Contact data={this.state.data} />
            </div>
        );
    }
});

React.render(
    <Portfolio />,
    document.getElementById('portfolio')
);
