
import { LightningElement, wire } from 'lwc';
import fetchUpComingCourses from '@salesforce/apex/CourseListLWCService.fetchUpComingCourses';
import fetchPastCourses from '@salesforce/apex/CourseListLWCService.fetchPastCourses';

import { NavigationMixin } from 'lightning/navigation';

//import CourseTitle from '@salesforce/resourceUrl/CourseTitle';

export default class CourseListComponent extends NavigationMixin(LightningElement) {

    upcomingCourse;
    pastCourse;
    __errors;
    isSpinner = false;

    // images = {
    //     course : CourseTitle
    // }

    @wire(fetchUpComingCourses)
    wiredUpComingCoursesData({ error, data }) {
        if (data) {
            this.upcomingCourse = data;
        } else if (error) {
            console.error('Course listcmpnt Error:', error);
            this.upcomingCourse = undefined;
            this.__errors = error;
        }
    }

    @wire(fetchPastCourses)
    wiredPastCoursesData({ error, data }) {
        if (data) {
            this.pastCourse = data;
        } else if (error) {
            console.error('Course listcmpnt Past Event Error:', error);
            this.pastCourse = undefined;
            this.__errors = error;
        }
    }

    handleourseClick = course => {

        course.preventDefault();
        let selectedCourseId = course.detail.courseId;
        alert('Helllo...' + selectedCourseId);
        let navigationTarget = {
            type: 'comm__namedPage',
            attributes: {
                name: "CourseDetails__c"
            },
            state: {
                courseId: selectedCourseId,
                source: 'CourseListPage'
            }
        }

        this[NavigationMixin.Navigate](navigationTarget);
    }
}