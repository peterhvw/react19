import { useState } from "react";

import { useTransition } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState('')
  const [list, setList] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; email: string; }[]>([])
  const [isPending, startTransition] = useTransition()

  // Simulate an API call with artificial delay
  const fakeApiCall = async (query: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Fake database of users
    const users = [
      { id: 1, name: 'John Smith', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
      { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
      { id: 5, name: 'Mike Brown', email: 'mike@example.com' },
    ]

    // Filter users based on query
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    )
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Urgent update - immediately show what the user is typing
    setSearchTerm(e.target.value)

    // Non-urgent update - wrap the API call and results update in startTransition
    startTransition(async () => {
      if (e.target.value.trim() === '') {
        setSearchResults([])
        return
      }

      try {
        const results = await fakeApiCall(e.target.value)
        setSearchResults(results)
      } catch (error) {
        console.error('Search failed:', error)
        setSearchResults([])
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Urgent update - will happen immediately
    setInputValue(e.target.value)

    // Non-urgent update - wrapped in startTransition
    startTransition(() => {
      // Generate a large list based on input
      const newList: string[] = []
      for (let i = 0; i < 10000; i++) {
        newList.push(`${e.target.value} item ${i}`)
      }
      setList(newList)
    })
  }

  return (
    <>
 
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange}
        placeholder="Type something..."
      />

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users..."
          className="border p-2 rounded"
        />
      </div>

      {isPending && (
        <div className="text-gray-500">Searching...</div>
      )}

      <div className={isPending ? 'opacity-50' : ''}>
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map(user => (
              <li key={user.id} className="border p-2 rounded">
                <div className="font-bold">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
              </li>
            ))}
          </ul>
        ) : searchTerm && !isPending ? (
          <div>No results found</div>
        ) : null}
      </div>
    </div>
    </>
  )
  };
  
export default Home;
