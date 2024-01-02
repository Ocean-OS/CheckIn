// @ts-nocheck
import { Student } from '$lib/classes/Student.js';
import { db } from '$lib/firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params }) {
	const students: Array<Student> = [];
	const studentData = await getDocs(query(collection(db, "students"), orderBy("shopHours")));
	studentData.forEach((record) => {
		if (record.exists()) {
			let recordData = record.data();
			students.push(new Student(recordData.firstName, recordData.lastName, recordData.id, recordData.scanTimes, recordData.shopHours));
		}
	})

	return {
		students: students
	};
}