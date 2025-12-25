
import {
    BlogList,
    ContactList,
    ProfileSetup
} from '../Components'

const DashboardRightBar = ({ props_data }) => {
    const { selectedMenu } = props_data;

  return (
    <div>
        {/* <h1 className='text-2xl'>Dashboard</h1>
        <p className='text-lg'>This is a placeholder for the dashboard content.</p> */}
        {
            selectedMenu === 'profile' ? (<div>{ <ProfileSetup/>}</div>) : null
        }
        {
            selectedMenu === 'blogs' ? (<div>{ <BlogList/>}</div>) : null
        }
        {
            selectedMenu === 'contacts' ? (<div>{ <ContactList/>}</div>) : null
        }
    </div>
  );
}


export default DashboardRightBar;