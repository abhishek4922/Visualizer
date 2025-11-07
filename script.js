document.getElementById("generateBtn").addEventListener("click", async () => {
    const narrative = document.getElementById("narrative").value.trim();
    const styleInput = document.querySelector('input[name="artStyle"]:checked');
    const style = styleInput ? styleInput.value : "Digital Art";

    if (!narrative) {
        alert("❌ Please enter a narrative to visualize your story.");
        return;
    }

    const storyboardDiv = document.getElementById("storyboard");
    const loadingDiv = document.getElementById("loading");
    const generateBtn = document.getElementById("generateBtn");
    
    storyboardDiv.innerHTML = "";
    loadingDiv.classList.add("active");
    generateBtn.disabled = true;

    try {
        const response = await fetch("http://127.0.0.1:5000/generate_storyboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ narrative, style_value: style })
        });

        const result = await response.json();
        loadingDiv.classList.remove("active");
        generateBtn.disabled = false;

        if (result.html) {
            storyboardDiv.innerHTML = result.html;
        } else {
            storyboardDiv.innerHTML = '<div class="error-message">❌ No output returned from the API. Please try again.</div>';
        }

    } catch (error) {
        loadingDiv.classList.remove("active");
        generateBtn.disabled = false;
        storyboardDiv.innerHTML = `<div class="error-message">❌ Error: ${error.message}</div>`;
        console.error(error);
    }
});
