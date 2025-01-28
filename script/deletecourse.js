// const deleteButtons = document.querySelectorAll('.delete-btn');
// deleteButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const courseId = button.getAttribute('data-id');
//         if (confirm('Are you sure you want to delete this course?')) {

//             button.closest('tr').remove();

//         } else {
//             alert("You cancelled the deletion.")
//         }

//     });
// });

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseId = button.getAttribute('data-id');


        const courseRef = firebase.database().ref('courses/' + courseId);


        courseRef.remove()
            .then(() => {
                console.log(`Course with ID ${courseId} deleted successfully.`);


                button.closest('tr').remove();
            })
            .catch(error => {
                console.error('Error deleting course:', error);
            });
    });
});