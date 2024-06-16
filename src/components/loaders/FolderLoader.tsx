import ContentLoader from "react-content-loader"

const FodlerLoader = () => (
  <ContentLoader 
    speed={2}
    width={250}
    height={150}
    viewBox="0 0 250 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="60" height="60" /> 
    <rect x="66" y="3" rx="6" ry="6" width="150" height="25" /> 
    <rect x="67" y="37" rx="8" ry="8" width="100" height="20" /> 
    <rect x="5" y="74" rx="100" ry="100" width="35" height="35" /> 
    <rect x="54" y="82" rx="6" ry="6" width="80" height="20" /> 
    <rect x="159" y="120" rx="6" ry="6" width="60" height="20" /> 
    <rect x="84" y="120" rx="6" ry="6" width="60" height="20" />
  </ContentLoader>
)

export default FodlerLoader