const UPDATE_PHOTO = "UPDATE_PHOTO";

const photosReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PHOTO:
      return state.map(photo =>
        photo.id === action.id
          ? { ...photo, description: action.description }
          : photo
      );
    default:
      return state;
  }
};

export default photosReducer;
