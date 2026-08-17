export default function ProfileHeader({ profile }) {
  return (
    <header className="text-center mb-4 mb-md-5">
      <img
        src={profile.avatar}
        alt={`Avatar de ${profile.name}`}
        width="128"
        height="128"
        className="avatar rounded-circle mb-3"
      />
      <h1 className="name mb-1">{profile.name}</h1>
      <p className="handle mb-2">
        @{profile.handle}
        <span className="sep" aria-hidden="true">
          ·
        </span>
        {profile.location}
      </p>
      <p className="bio mx-auto mb-0">{profile.bio}</p>
    </header>
  );
}
