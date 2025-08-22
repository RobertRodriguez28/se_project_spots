export function setButtonText(
  submitbtn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    submitbtn.textContent = loadingText;
    submitbtn.disabled = true;
    // set the loading text
  } else {
    submitbtn.textContent = defaultText;
    submitbtn.disabled = false;
    // set the load text
  }
}
