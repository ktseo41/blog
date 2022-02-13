# 📟 Vim

<ImageWithCaption src="https://i.redd.it/yffw4nzgv9a11.jpg" alt="The FOOL...">
    <template v-slot:figcaption>
        <a href="https://www.reddit.com/r/ProgrammerHumor/comments/8z99lf/vim_no_exit_d_d/" target="_blank">출처 : VIM! No EXIT !! :D :D</a>
    </template>
</ImageWithCaption>

## 링크
-  [AdventOfCode Day1 Vim풀이](https://www.reddit.com/r/adventofcode/comments/r66vow/comment/hmrrmwr/?utm_source=share&utm_medium=web2x&context=3)
-  [VimHelp](https://vimhelp.org/)

## Use Cases

### Changing case

-  `~` : case 변경 후 오른쪽으로 커서 이동
-  `{Visual}~`: highlighted text case 변경
-  `{Visual}U` : highlighted text uppercase로 변경
-  `{Visual}u` : highlighted text lowercase로 변경

#### 참고 

-  [https://stackoverflow.com/questions/2946051/changing-case-in-vim](https://stackoverflow.com/questions/2946051/changing-case-in-vim)
-  [https://vimhelp.org/change.txt.html#~](https://vimhelp.org/change.txt.html#~)

### Indentation

- `{Visual}[count]>` : 현재 line count 수 만큼 오른쪽으로 indent (shiftwidth)
- `>%` : curly-braces block 오른쪽으로 indent
- `>iB` : block을 오른쪽으로 indent

#### 참고

- [https://stackoverflow.com/questions/235839/indent-multiple-lines-quickly-in-vi/235841#:~:text=Use%20the%20%3E%20command.,inside%20block%20use%20%3E%20i%20B%20.](https://stackoverflow.com/questions/235839/indent-multiple-lines-quickly-in-vi/235841#:~:text=Use%20the%20%3E%20command.,inside%20block%20use%20%3E%20i%20B%20.)
- [https://vimhelp.org/change.txt.html#%3E](https://vimhelp.org/change.txt.html#%3E)

### Substitution

`:[range]substitution/from/to/[flags]`

- `:%s/from/to/[flags]` : 전체 파일을 탐색하면서 substitution을 수행. %`는 전체 문자열을 의미, `s`는 substitution을 의미
- `:.,$s/from/to/[flags]` : 현재라인부터 파일의 끝까지 탐색하면서 substitution을 수행

#### 참고

- [https://vimhelp.org/usr_10.txt.html#10.2](https://vimhelp.org/usr_10.txt.html#10.2)


## debt

-  [My vim setup to speed up ...](https://www.youtube.com/watch?v=UZBjt04y4Oo)
-  [neovim 설정 (CoC, Vim-Plug, treesitter, NERDTree)](https://velog.io/@mythos/Linux-neovim-%EC%84%A4%EC%A0%95-CoC-Vim-Plug-treesitter-NERDTree)
-  [fzf](https://github.com/junegunn/fzf)
-  [vim-surround](https://github.com/tpope/vim-surround)

<style scoped>
.figure {
  margin: 0 auto;
  width: 450px;
}
</style>
