import { trigger, state, style, animate, transition, query, keyframes, stagger } from '@angular/animations';
export let fadeIn = trigger('animationTrigger', [
    state('void', style({opacity:0})),
    transition(':enter, :leave', [
        animate('1s ease-in', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: .3, offset: 0.3}),
            style({opacity: .6, offset: 0.6}),
            style({opacity: 1, offset: 1.0}),
            ]))])
    ])

  export let slidetoLeftBounced = trigger('animationTrigger', [
    transition('* => *', [

      query(':enter', style({ opacity: 0 }), {optional: true}),

      query(':enter', stagger('200ms', [
        animate('0.8s ease-in', keyframes([
          style({opacity: 0.2, transform: 'translateX(100%)', border:'2.5px solid', offset: 0}),
          style({opacity: .8, transform: 'translateX(-35px)', border:'1px solid', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', border:'1px solid', offset: 1.0}),
        ]))
    ]), {optional: true}),

        query(':leave', stagger('200ms', [
            animate('0.8s ease-in', keyframes([
              style({opacity: 1, transform: 'translateX(0)', border:'1px solid', offset: 0}),
              style({opacity: .8, transform: 'translateX(-35px)', border:'1px solid', offset: 0.3}),
              style({opacity: 0.2, transform: 'translateX(100%)', border:'2.5px solid', offset: 1}),
            ]))
        ]), {optional: true}),
    ])
  ])
