export default function Loading({loading, searching}) {
    return (
        <div>
            {loading ? 'Loading...' : `'${searching}'의 검색결과`}
        </div>
    )
}