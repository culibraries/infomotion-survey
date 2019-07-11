node {
    stage(' GIT CHECKOUT') {
        git(branch: 'devops', credentialsId: 'dutr5288-github', url: 'git@github.com:culibraries/infomotion-survey.git')
    }
    stage('BUILD IMAGES ') {
        app = docker.build('culibraries/infomotion:1.1.0')
    }
    stage('Deploy Image') {
      docker.withRegistry( '', 'trinhdh-dockerhub' ) {
        app.push()
      }
    }
}
