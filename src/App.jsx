import { profile } from './data/profile';
import ProfileHeader from './components/ProfileHeader';
import LinkList from './components/LinkList';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="page d-flex flex-column min-vh-100">
      <main className="container flex-grow-1 d-flex justify-content-center align-items-start py-4 py-md-5">
        <div className="link-card w-100">
          <ProfileHeader profile={profile} />
          <LinkList links={profile.links} />
        </div>
      </main>
      <Footer handle={profile.handle} />
    </div>
  );
}
