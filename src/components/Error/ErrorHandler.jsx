
const ErrorHandler = () => {
    return (
        <div className="gap-4 flex items-center">
            <span>Oh no, something went wrong!</span> <br />
            <button
                className="btn btn-primary text-red-600 border border-red-600"
                onClick={() => window.location.reload()}>
                Try again
            </button>
        </div>
    );
};

export default ErrorHandler;