interface LookingForUsersProps {
    usersInLobby: number
}

function LookingForUsers({ usersInLobby }: LookingForUsersProps) {
    return (
        <div>
            <span>
            Looking for users...
            </span>
            <span>
                {`${usersInLobby} / 6`}
            </span>
        </div>
    );
}

export default LookingForUsers;