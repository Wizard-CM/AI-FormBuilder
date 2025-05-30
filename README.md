# Use the same loaders


# Use the same colors
- Background: #000000 
- Text: #E0E0E0 (Light gray, easy on the eyes)
- Highlighted Text color : #9472FF
- Button color :  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 





I have provided you two components , Can you make changes in the UI so that they look very attractive. Use the same theme colors as above.

The homePage component is being used in the "/" route , so make it according.


# Delete Button
          <button
            onClick={() => deleteFormHandler(form.id)}
            className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-red-900/20 hover:bg-red-900/30 border border-red-800/50 hover:border-red-700 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 group/delete"
          >
            <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" />
            <span className="font-medium">Delete</span>
          </button>