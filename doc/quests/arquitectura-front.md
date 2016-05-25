# Arquitectura del Front

## Detalle de quest embebido

+ quest-foldable
	+ (1) quest-header(ng-click='fold')
	+ (1) quest-actions
	+ (1) quest-description
	+ (1) quest-journal
		+ (N) journal-entry-summary
	+ (1) quest-track
		+ (N) quest-todo-item
	+ (1) quest-inventory
		+ (N) quest-inventory-item

## Detalle de quest
	+
		+ (1) quest-header(ng-click=null)
		+ (1) quest-actions
		+ (1) quest-description
		+ (1) quest-journal
			+ (N) journal-entry-summary
		+ (1) quest-track
			+ (N) quest-todo-item
		+ (1) quest-inventory
			+ (N) quest-inventory-item