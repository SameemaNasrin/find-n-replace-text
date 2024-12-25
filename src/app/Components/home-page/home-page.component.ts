import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  isFindNReplace: boolean = false;
  textField: string = '';
  findTextControl!: FormControl;
  ReplaceTextControl!: FormControl;
  foundTextCount: number = 0;
  selectedTextCount: number = 0;
  currentMatchIndex: number = 0;
  @ViewChild('textFieldPre') textFieldPre!: ElementRef;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this.findTextControl = new FormControl('');
    this.ReplaceTextControl = new FormControl('');
  }

  syncScroll(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (this.textFieldPre) {
      this.textFieldPre.nativeElement.scrollTop = textarea.scrollTop;
      this.textFieldPre.nativeElement.scrollLeft = textarea.scrollLeft;
    }
  }

  togglePanel() {
    this.isFindNReplace = !this.isFindNReplace;
  }

  updateTextFieldPre() {
    const textAreaElement = document.getElementById('text-area') as HTMLElement;
    if (textAreaElement) {
      textAreaElement.innerHTML = this.textField.replace(/\n/g, '<br>');
    }
    this.findText();
  }

  findText() {
    const textAreaElement = document.getElementById('text-area') as HTMLElement;

    const originalText = textAreaElement.innerHTML.replace(
      /<mark>(.*?)<\/mark>/g,
      '$1'
    );
    if (this.findTextControl.value) {
      this.foundTextCount = (
        this.textField.match(new RegExp(this.findTextControl.value, 'ig')) || []
      ).length;
      if (!this.currentMatchIndex && this.foundTextCount)
        this.currentMatchIndex = 1;
      else {
        this.currentMatchIndex =
          (this.currentMatchIndex + this.foundTextCount) % this.foundTextCount;
        if (!this.currentMatchIndex)
          this.currentMatchIndex = this.foundTextCount;
      }
    } else {
      this.foundTextCount = 0;
      this.currentMatchIndex = 0;
    }

    const escapedSearchText = this.findTextControl.value.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );
    const regex = new RegExp(`(${escapedSearchText})`, 'gi');
    const highlightedText = originalText.replace(regex, '<mark>$1</mark>');

    textAreaElement.innerHTML = highlightedText;
  }

  replaceTextAt() {
    const searchText = this.findTextControl.value;
    const replaceText = this.ReplaceTextControl.value;

    if (!searchText) return;

    const regex = new RegExp(searchText, 'gi');
    let match;
    let count = 0;
    let startIndex = -1;

    while ((match = regex.exec(this.textField)) !== null) {
      count++;
      if (count === this.currentMatchIndex) {
        startIndex = match.index;
        break;
      }
    }

    if (startIndex === -1) {
      return;
    }

    const beforeMatch = this.textField.slice(0, startIndex);
    const afterMatch = this.textField.slice(startIndex + searchText.length);

    this.textField = beforeMatch + replaceText + afterMatch;

    this.updateTextFieldPre();
    // if (!this.currentMatchIndex) this.currentMatchIndex = this.foundTextCount;

    this.openSnackBar(`Replaced occurrence`, 'X');
  }

  replaceAll() {
    const regex = new RegExp(this.findTextControl.value, 'gi');
    let count = 0;

    this.textField = this.textField.replace(regex, (match) => {
      count++;
      return this.ReplaceTextControl.value;
    });

    this.updateTextFieldPre();
    this.openSnackBar(`Replaced ${count} occurrence`, 'X');
  }

  nextFoundText(prevOrNext: string) {
    const textAreaElement = document.getElementById('text-area') as HTMLElement;
    const matches = Array.from(textAreaElement.querySelectorAll('mark'));

    if (!matches.length) return;

    if (prevOrNext === 'prev')
      this.currentMatchIndex =
        (this.currentMatchIndex - 1 + this.foundTextCount) %
        this.foundTextCount;
    else {
      this.currentMatchIndex =
        (this.currentMatchIndex + 1 + this.foundTextCount) %
        this.foundTextCount;
    }

    if (!this.currentMatchIndex) this.currentMatchIndex = this.foundTextCount;

    matches[this.currentMatchIndex - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    matches.forEach((match, index) => {
      if (index === this.currentMatchIndex - 1) {
        match.style.backgroundColor = 'orange';
      } else {
        match.style.backgroundColor = 'yellow';
      }
    });
  }
}
