import PersonalSiteContainer from "./containers/personal_site_test/PersonalSiteContainer";
import VideoSourceContainer from "./containers/video_source/VideoSourceContainer";
import VideoUploadContainer from "./containers/video_upload/VideoUploadContainer";

const App = () => {
  return (
    <div>
        <p>react-labs</p>

        <VideoSourceContainer></VideoSourceContainer>
        <br/>
        <VideoUploadContainer></VideoUploadContainer>
    </div>
  );
};

export default App;
