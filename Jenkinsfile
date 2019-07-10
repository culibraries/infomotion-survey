node {
    def app
    stage('Initialize'){
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
    stage('Verify Docker'){
        sh 'docker version'
    }
}
