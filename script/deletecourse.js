const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseId = button.getAttribute('data-id');

        const isConfirmed = confirm(`Are you sure you want to delete the course with ID ${courseId}?`);

        if (isConfirmed) {
            button.closest('tr').remove();
            // const courseRef = firebase.database().ref('courses/' + courseId);
            // courseRef.remove()
            //     .then(() => {
            //         console.log(`Course with ID ${courseId} deleted successfully.`);

            //         // Remove the row from the table
            //         button.closest('tr').remove();
            //     })
            //     .catch(error => {
            //         console.error('Error deleting course:', error);
            //     });
        } else {
            alert('Deletion canceled.');
        }
    });
});



const updateButtons = document.querySelectorAll('.edit-btn');
updateButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseId = button.getAttribute('data-id');
        console.log(courseId);
        //const courseRef = firebase.database().ref('courses/' + courseId);
        document.getElementById('update-form').style.display = 'block';
    });
});

// Show update form with current course data
// document.querySelectorAll('.edit-btn').forEach(button => {
//     button.addEventListener('click', () => {
//         selectedCourseId = button.getAttribute('data-id'); // Get course ID
//         const courseRef = db.ref('courses/' + selectedCourseId);

//         // Fetch course data
//         courseRef.once('value').then(snapshot => {
//             const data = snapshot.val();
//             if (data) {
//                 document.getElementById('update-title').value = data.title;
//                 document.getElementById('update-category').value = data.category;
//                 document.getElementById('update-instructor').value = data.instructor;
//                 document.getElementById('update-price').value = data.price;
//                 document.getElementById('update-duration').value = data.duration;

//                 document.getElementById('update-form').style.display = 'block';
//             }
//         });
//     });
// });

// Save updated course data
document.getElementById('save-update').addEventListener('click', () => {
    if (selectedCourseId) {
        const updatedData = {
            title: document.getElementById('update-title').value,
            category: document.getElementById('update-category').value,
            instructor: document.getElementById('update-instructor').value,
            price: document.getElementById('update-price').value,
            duration: document.getElementById('update-duration').value
        };

        db.ref('courses/' + selectedCourseId).update(updatedData)
            .then(() => {
                alert('Course updated successfully!');
                document.getElementById('update-form').style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating course:', error);
            });
    }
});