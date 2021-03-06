// Globals to export from IIFE
var work, projects, bio, education, githubStats;

// IIFE
(function() {
"use strict";

var LIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec " +
    "nec erat efficitur, fermentum risus sit amet, consequat orci. " +
    "Sed quis condimentum leo. Pellentesque ac vestibulum ante. Nunc " +
    "cursus tincidunt nunc, hendrerit semper justo consectetur nec. " +
    "Proin efficitur mi eu justo porttitor scelerisque. Sed " +
    "tincidunt tempor sem, et vulputate orci imperdiet sit amet. " +
    "Nullam venenatis faucibus sem vitae posuere.";

work = {
    "jobs": [{
        "employer": "Wonka Industries",
        "title": "Full-Stack Developer",
        "location": "Munich",
        "dates": "2010-2011",
        "description": LIPSUM
    }, {
        "employer": "E-Corp",
        "title": "Web Developer",
        "location": "New York",
        "dates": "2011-2014",
        "description": LIPSUM
    }]
};

projects = {
    "projects": [{
        "title": "Fun Project",
        "dates": "2010-2011",
        "description": LIPSUM,
        "images": [
            "images/197x148.gif",
            "images/197x148.gif",
        ]
    }, {
        "title": "Challenging Project",
        "dates": "2014-16",
        "description": LIPSUM,
        "images": [
            "images/197x148.gif"
        ]
    }, {
        "title": "Silly Project",
        "dates": "2015-16",
        "description": LIPSUM,
        "images": [
            "images/197x148.gif",
            "images/197x148.gif",
        ]
    }]
};



bio = {
    "name": "Sam Frances",
    "role": "Web Developer",
    "contacts": {
        "mobile": "0000 000 000",
        "email": "sam@samfrances.uk",
        "github": "samfrances",
        "twitter": "existentialcoms",
        "location": "London, UK"
    },
    "welcomeMessage": "Welcome to my resume.",
    "skills": ["Python", "Javascript"],
    "biopic": "images/fry.jpg",
};

education = {
    "schools": [{
        "name": "University College London",
        "location": "London, UK",
        "degree": "M.A.",
        "majors": ["Linguistics"],
        "dates": "2009-2010",
        "url": "https://www.ucl.ac.uk/"
    }, {
        "name": "King's College London",
        "location": "London, UK",
        "degree": "B.A.",
        "majors": ["Philosophy"],
        "dates": "2006-2009",
        "url": "http://www.kcl.ac.uk"
    }],
    "onlineCourses": [{
        "title": "Full Stack Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004"
    }, {
        "title": "Front End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "In progress",
        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
    }]
};

githubStats = {
    "username": bio.contacts.github
};

work.display = function() {
    this.jobs.forEach(function(job) {

        // Create work entry
        $('#workExperience').append(HTMLworkStart);

        // Cache work entry
        var $workentry = $('.work-entry:last');

        // Create title line
        var employer = HTMLworkEmployer.replace('%data%', job.employer);
        var title = HTMLworkTitle.replace('%data%', job.title);

        $workentry.append(employer + title);

        // Add  work dates
        $workentry.append(HTMLworkDates.replace("%data%", job.dates));

        // Add location
        $workentry.append(HTMLworkLocation.replace("%data%", job.location));

        // Add description
        $workentry.append(HTMLworkDescription.replace("%data%", job.description));
    });
};

projects.display = function() {
    this.projects.forEach(function(project) {

        // Create project entry
        $('#projects').append(HTMLprojectStart);

        // Cache project entry
        var $projectentry = $('.project-entry:last');

        // Add title

        $projectentry.append(
            HTMLprojectTitle.replace('%data%', project.title)
        );

        // Add project dates to entry
        $projectentry.append(HTMLprojectDates.replace('%data%',
            project.dates));

        // Add project description to entry
        $projectentry.append(
            HTMLprojectDescription.replace('%data%', project.description)
        );

        project.images.forEach(function(url) {
            $projectentry.append(HTMLprojectImage.replace('%data%', url));
        });
    });
};

bio.display = function() {

    // Cache header
    var $header = $('#header');

    // Display role
    if ('role' in bio && bio.role.length > 0) {
        $header.prepend(HTMLheaderRole.replace("%data%", this.role));
    }

    // Display name
    if ('name' in bio && bio.name.length > 0) {
        $header.prepend(HTMLheaderName.replace("%data%", this.name));
    }

    // Display contacts

    var contactTemplates = {
        "mobile": HTMLmobile,
        "email": HTMLemail.replace("%data%", '<a href="mailto:%data%">%data%</a>'),
        "github": HTMLgithub.replace("%data%", '<a href="http://www.github.com/%data%">%data%</a>'),
        "twitter": HTMLtwitter.replace("%data%", '<a href="http://www.twitter.com/%data%">@%data%</a>'),
        "blog": HTMLblog,
        "location": HTMLlocation
    };
    var $topContacts = $('#topContacts');
    Object.keys(bio.contacts).forEach(function(contact) {
        if (Object.keys(contactTemplates).indexOf(contact) !== -1) {
            $topContacts.append(
                contactTemplates[contact].replace(/%data%/g, bio.contacts[contact])
            );
        } else {
            $topContacts.append(
                HTMLcontactGeneric.replace("%contact%", contact)
                .replace("%data%", this.contacts[contact])
            );
        }
    });

    // Display contacts in footer
    $('#footerContacts').append($('#topContacts > li').clone());

    if ('biopic' in bio && bio.biopic.length > 0) {
        $header.append(HTMLbioPic.replace("%data%", bio.biopic));
    }

    // Display welcome message
    if ('welcomeMessage' in bio && bio.welcomeMessage.length > 0) {
        $header.append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    }

    // Display skills
    if ('skills' in bio && bio.skills.length > 0) {
        $header.append(HTMLskillsStart);
        var $skills = $('#skills');
        bio.skills.forEach(function(skill) {
            $skills.append(HTMLskills.replace('%data%', skill));
        });
    }
};

education.display = function() {
    var $edu = $('#education');
    this.schools.forEach(function(school) {
        $edu.append(HTMLschoolStart);
        var $entry = $('.education-entry:last');

        // Name of school and degree
        var school_degree = HTMLschoolName.replace("%data%", school.name)
            .replace("#", school.url);
        school_degree += HTMLschoolDegree.replace("%data%", school.degree);

        $entry.append(school_degree);

        // Dates
        $entry.append(HTMLschoolDates.replace("%data%", school.dates));

        // Location
        $entry.append(HTMLschoolLocation.replace("%data%", school.location));

        school.majors.forEach(function(major) {
            $entry.append(HTMLschoolMajor.replace("%data%", major));
        });
    });

    if ('onlineCourses' in this && this.onlineCourses.length > 0) {
        // Add online courses heading
        $edu.append(HTMLonlineClasses);

        // Fill in course entries
        this.onlineCourses.forEach(function(course) {
            $edu.append(HTMLschoolStart);
            var $entry = $('.education-entry:last');

            var school_course = HTMLonlineTitle.replace("%data%", course.title)
                .replace("#", course.url);
            school_course += HTMLonlineSchool.replace("%data%", course.school);

            $entry.append(school_course)
                .append(HTMLonlineDates.replace("%data%", course.dates))
                .append(
                    HTMLonlineURL.replace("%data%", course.url)
                    .replace("#", course.url)
                );

        });
    }
};

// Display github statistics
githubStats.display = function() {

    // Cache list to store github stats
    var $gh = $('#github-stats');

    if ('username' in this && this.username.length > 0) {
        var url = 'https://api.github.com/users/' + this.username;

        // List of data we want
        var data_keys = ['followers', 'following', 'public_repos', 'public_gists'];

        // Query API and fill in data
        $.getJSON(url, function(data) {
            // Display categories of data in data_keys
            data_keys.forEach(function(key) {
                if (key in data) {
                    $gh.append(
                        HTMLGithubStat.replace("%title%", key.replace("_", " "))
                        .replace("%data%", data[key])
                    );
                }
            });

            // Display yaer joined
            if ('created_at' in data) {
                var joined = (new Date(data.created_at)).getFullYear().toString();
                $gh.append(
                    HTMLGithubStat.replace("%title%", "joined")
                    .replace("%data%", joined)
                );
            }
        });
        // If there is not username, remove the github stats section
    } else {
        $('#github').remove();
    }
};

// Display all data objects
[work, projects, bio, education, githubStats].forEach(function(obj) {
    obj.display();
});


// Add map

$('#mapDiv').append(googleMap);

// End IIFE
}());