class PhotoResultService {
  get() {
    return fetch(
      "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=25"
    )
      .then(response => response.json())
      .catch(() => {});
  }
}

const photoResultService = new PhotoResultService();

export default photoResultService;
