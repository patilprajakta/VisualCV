export default () => {

        return {
            getProfileInfo: '/api/core/myProfile',
            getAllEmployees: '/api/search/getAllEmployee',
            login: '/api/backend/signin',
            getAllSkills: '/api/search/skillmatrix',
            getDesignationCategory: '/api/search/skilltypes',
            getSkillsByDesg: '/api/search/skillsByDesignation',
            getSkills: '/api/core/skills',
            updateSummary: '/api/myProfile/summary/:id/',
            deleteSkills: '/api/skills/delete/',
            saveSkills: '/api/myProfile/skills/',
            saveExpDetails: '/api/myProfile/experiencedetails/',
            updateExpDetails: '/myProfile/experiencedetails/:id/',
            getAllEmpSkills:'/api/search/getAllSkills',
            publishProfile: '/api/core/myProfile/publish',
            viewPublicProfile: '/api/core/myProfile/viewProfile',
            getAllEmployeeBySkill: '/api/search/skill',
            saveArticle:'/myProfile/articles/',
            updateArticle:'/myProfile/articles/:id/',
            saveCertificate:'/myProfile/articles/',
            updateCertificate:'/myProfile/articles/:id/'
        }
}