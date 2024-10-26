const renameForm = document.querySelector("#renameForm");
if (renameForm) {
    renameForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newFilename = renameForm.querySelector("input[name='newFilename']").value;
        const filename = renameForm.getAttribute("data-filename");

        try {
            const response = await fetch(`/update/${filename}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `newFilename=${encodeURIComponent(newFilename)}`, // تأكد من تشفير الاسم
            });

            if (response.ok) {
                alert("File renamed successfully!");
                window.location.href = "/";
            } else {
                const errorMessage = await response.text(); // الحصول على نص الخطأ
                alert(`Error renaming file: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll("form[action^='/delete'] button")
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (!confirm("Are you sure you want to delete this file?")) {
                event.preventDefault()
            }
        })
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchResultsModal = document.getElementById("searchResultsModal");
    const searchResultsList = document.getElementById("searchResultsList");
    const closeButton = document.querySelector(".close-button");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = document.getElementById("searchQuery").value;

        try {
            const response = await fetch(`/search?query=${query}`);
            const results = await response.json();

            // تحديث قائمة نتائج البحث
            searchResultsList.innerHTML = '';
            if (results.length > 0) {
                results.forEach(file => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="/files/${file}">${file}</a>`;
                    searchResultsList.appendChild(listItem);
                });
            } else {
                searchResultsList.innerHTML = '<li>No files found.</li>';
            }

            
            searchResultsModal.style.display = "block";
        } catch (error) {
            console.error("Error:", error);
        }
    });

    closeButton.addEventListener("click", () => {
        searchResultsModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === searchResultsModal) {
            searchResultsModal.style.display = "none";
        }
    });
});
